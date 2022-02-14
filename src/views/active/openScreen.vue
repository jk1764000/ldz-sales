<template>
  <div class="add-project-wrap">
    <h2 class="editer-room">投票首页设置</h2>
    <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="addParam"
      ref="addParam"
      :rules="rules"
    >
      <div>
        <el-form-item label="活动介绍名称" prop="homeScreenIntroName">
          <el-input v-model="addParam.homeScreenIntroName" maxlength="6"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开屏logo图片">
          <uploldcom
            :isone="true"
            :imgurles="addParam.homeScreenLogoUrl"
            @uploadSuccess = "homeScreenLogoUrl"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开屏页背景图片">
          <uploldcom
            :isone="true"
            :imgurles="addParam.homeScreenPicUrl"
            @uploadSuccess = "homeScreenPicUrl"
          ></uploldcom>
        </el-form-item>
      </div>
      
      <div>
        <el-form-item label="开屏单元设置">
          <el-button type="primary" @click="addopenScreen">添加</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label=" " v-if="openScreenList && openScreenList.length > 0">
          <div class="groupinfo" v-for="(item,index) in openScreenList" :key="index">
            <el-input class="taginput" v-model="item.orderNumber" placeholder="单元排序序号"></el-input>
            <el-input class="taginput" v-model="item.unitName" placeholder="单元名称"></el-input>
            <el-input v-model="item.unitLink" placeholder="跳转链接"></el-input>
            <el-button class="delbutton" type="danger" @click="delvote(index)">删除</el-button>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="往期活动是否展示">
           <el-radio-group v-model="addParam.pastActivityIsShow">
            <el-radio :label="'0'">是</el-radio>
            <el-radio :label="'1'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="往期单元名称" v-if="addParam.pastActivityIsShow == '0'">
          <el-input v-model="addParam.pastActivityShowName" maxlength="6"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="历届活动是否展示">
           <el-radio-group v-model="addParam.historyActivityIsShow">
            <el-radio :label="'0'">是</el-radio>
            <el-radio :label="'1'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="历届单元名称" v-if="addParam.historyActivityIsShow == '0'">
          <el-input v-model="addParam.historyActivityShowName" maxlength="6"></el-input>
        </el-form-item>
      </div>
      <div class="footer">
        <el-button>返回</el-button>
        <el-button type="success" class="save" @click="openscreen('addParam')">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import uploldcom from "@/components/Upload/index.vue";
import {activityHomescreenSave,activityInfoDetail} from "@/api/active.js"
export default {
  data() {
    return {
      openScreenList:[],
      addParam: {
        id:'',
        homeScreenIntroName:'',
        homeScreenPicUrl:'',
        homeScreenLogoUrl:'',
        activityHomeScreenUnitList:[],
        historyActivityShowName:'',
        historyActivityIsShow:'0',
        pastActivityIsShow:'0',
        pastActivityShowName:'',
      },
      rules: {
        homeScreenIntroName: [
          { required: true, message: "请输入活动介绍", trigger: "blur" },
        ],
        
      },
    };
  },
  components: {
    uploldcom
  },
  methods: {
    getopenInfo(){
      activityInfoDetail({
        id:this.addParam.id
      }).then((res)=>{
        if(res.code == "0"){
          for(let index in this.addParam){
            if(res.data[index]){
              this.addParam[index] = res.data[index]
              if(res.data.activityHomeScreenUnitList){
                this.openScreenList = res.data.activityHomeScreenUnitList
              }else{
                this.openScreenList = [];
              }
              
            }
          }
        }
      })
    },
    homeScreenPicUrl(val){
      this.addParam.homeScreenPicUrl =val
    },
    homeScreenLogoUrl(val){
      this.addParam.homeScreenLogoUrl = val;
    },
    addopenScreen(){
      this.openScreenList.push({
        unitName:'',
        unitLink:'',
        orderNumber:1,
      })
    },
    delvote(index){
      this.openScreenList.splice(index,1);
    },
    
    openscreen(addParam){
      this.$refs[addParam].validate(valid => {
        if (valid) {
          let openScreenListParam = []
          if(this.openScreenList && this.openScreenList.length > 0){
            for(let i = 0; i<this.openScreenList.length;i++){
              let puname = {
                unitName:this.openScreenList[i].unitName,
                unitLink:this.openScreenList[i].unitLink,
                orderNumber:this.openScreenList[i].orderNumber,
              }
              openScreenListParam.push(puname)
            }
          }else{
            openScreenListParam = [];
          }
          this.addParam.activityHomeScreenUnitList =openScreenListParam
          if(this.addParam.pastActivityIsShow == '1') this.addParam.pastActivityShowName = "";
          if(this.addParam.historyActivityIsShow == '1') this.addParam.historyActivityShowName = "";
          
          activityHomescreenSave(this.addParam).then((res)=>{
            if(res.code == "0"){
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
          });
        }
      })
      
    },
  },
  created() {
    this.addParam.id = Number(this.$route.query.id);
    this.getopenInfo();
   
  },
};
</script>
<style scoped lang="scss">
.add-project-wrap {
  min-width: 900px;
  padding: 20px 20px 60px 40px;
  .editer-room {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .select-wrap {
    width: 180px;
    display: inline-block;
  }
  .footer {
    margin-top: 40px;
  }
  .tips {
    line-height: 40px;
    font-size: 14px;
  }
}
.groupinfo{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  .taginput{
    margin-right: 10px;
  }
  .tas{
    font-size: 20px;
    margin:0 5px;
    color: #aaa;
  }
  .delbutton{
    margin-left: 10px;
  }
}
</style>
