<template>
  <div class="add-project-wrap">
    <h2 v-if="id" class="editer-room">编辑单位</h2>
    <h2 v-else class="editer-room">新增单位</h2>
    <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="addParam"
      ref="addParam"
      :rules="rules"
    >
      <div>
        <el-form-item label="参展单位名称" prop="companyName">
          <el-input v-model="addParam.companyName" maxlength="18"></el-input>
        </el-form-item>
      </div>
      <!-- <div>
        <el-form-item label="参展单位编号" prop="number">
          <el-input v-model="addParam.number" maxlength="12"></el-input>
        </el-form-item>
      </div> -->
      <div>
        <el-form-item label="参展单位首图" prop="companyHomePicUrl">
          <uploldcom
            :isone="true"
            :imgurles="companyHomePicUrl"
            @uploadSuccess = "uploadimg"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="参展单位类型">
           <el-radio-group v-model="addParam.companyType">
            <el-radio :label="'0'">非人物</el-radio>
            <el-radio :label="'1'">人物</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div v-if="addParam.companyType == '1'">
        <el-form-item label="人物简介">
          <el-input
            style="width: 500px"
            :rows="4"
            type="textarea"
            v-model="addParam.remark"
          ></el-input>
        </el-form-item>
      </div>
      <div v-if="addParam.companyType != '1'">
        <el-form-item label="参展单位省">
          <el-input v-model="addParam.province"></el-input>
        </el-form-item>
      </div>
      <div v-if="addParam.companyType != '1'">
        <el-form-item label="参展单位市">
          <el-input v-model="addParam.city"></el-input>
        </el-form-item>
      </div>
      
      <div>
        <el-form-item label="项目亮点" class="advantage" prop="advantage">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入项目亮点"
            v-model="addParam.advantage">
          </el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="参展单位介绍" prop="title">
          <uploldcom
            :isone="false"
            :imglist="comDescUrlList"
            @uploadSuccess = "resourceUploadimg"
          ></uploldcom>
        </el-form-item>
      </div>
      <div class="footer">
        <el-button @click="goback">返回</el-button>
        <el-button type="success" class="save" @click="createcompamy('addParam')">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import uploldcom from "@/components/Upload/index.vue";
import {companyCreate,companyUpdate,companyDetail} from "@/api/company.js"
export default {
  data() {
    return {
      id: "",
      // onlineVotes:0,
      companyHomePicUrl:'',
      comDescUrlList:[],
      activityId:0,
      addParam: {
        companyName:'',
        advantage:'',
        companyHomePicUrl:'',
        province:'',
        city:'',
        comDescUrlList:[],
        companyType:'0',
        remark:'',
        // baseVotes:0
      },
      rules: {
        companyName: [
          { required: true, message: "请填写单位名称", trigger: "blur" },
        ],
        // number: [
        //   { required: true, message: "请填写单位序号", trigger: "blur" },
        // ],
        companyHomePicUrl: [
          { required: true, message: "请上传首图", trigger: "blur" },
        ],
        // province: [
        //   { required: true, message: "请输入单位省份", trigger: "blur" },
        // ],
        // city: [
        //   { required: true, message: "请输入单位城市", trigger: "blur" },
        // ],
        
        advantage: [
          { required: true, message: "请输入项目亮点", trigger: "blur" },
        ],
        // baseVotes: [
        //   { required: true, message: "请输入基础票数", trigger: "blur" },
        // ],
        
      },
    };
  },
  components: {
    uploldcom
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    getCompanyDetail(){
      companyDetail({id:this.id}).then((res)=>{
        if(res.code == '0'){
          this.comDescUrlList= []
          for(let index in this.addParam ){
            this.addParam[index] = res.data[index]
            this.companyHomePicUrl= res.data.companyHomePicUrl
          }
          if(res.data.resourceList && res.data.resourceList.length > 0) {
              let resourceList = res.data.resourceList
              for(let i = 0;i<resourceList.length;i++){
                this.comDescUrlList.push(resourceList[i].resourceUrl)
              }
            }
        }
      });
    },
    resourceUploadimg(val){
      this.addParam.comDescUrlList = val
    },
    uploadimg(val){
      this.addParam.companyHomePicUrl = val;
    },
    createcompamy(addParam){
      this.$refs[addParam].validate(valid => {
        if (valid) {
          if(this.id){
            this.addParam.id = Number(this.id)
            //编辑
            companyUpdate(this.addParam).then((res)=>{
              if(res.code == "0"){
                this.$message({
                  message: '单位编辑成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
            });
          }else{
            //新增
            companyCreate(this.addParam).then((res)=>{
              if(res.code == "0"){
                this.$message({
                  message: '单位新增成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
            });
          }
        }
      })
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getCompanyDetail();
    } 
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
::v-deep .el-textarea__inner{
  width: 500px!important;
}
</style>
