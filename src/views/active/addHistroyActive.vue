<template>
  <div class="add-project-wrap">
    <h2 v-if="id" class="editer-room">编辑活动</h2>
    <h2 v-else class="editer-room">新增活动</h2>
    <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="addParam"
      ref="addParam"
      :rules="rules"
    >
      <div>
        <el-form-item label="活动短标题" prop="activityName">
          <el-input v-model="addParam.activityName" maxlength="12"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动首图" prop="activityName">
          <uploldcom
            :isone="true"
            :imgurles="addParam.homeUrl"
            @uploadSuccess = "homeUrluploadimg"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="排序序号" prop="orderNumber">
          <el-input v-model="addParam.orderNumber" maxlength="12"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动起止时间" prop="startTime">
          <el-date-picker
            size="medium"
            v-model="addParam.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="选择活动开始时间"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="链接" prop="activityLink">
          <el-input v-model="addParam.activityLink"></el-input>
        </el-form-item>
      </div>
      <div class="footer">
        <el-button>返回</el-button>
        <el-button type="success" class="save" @click="saveActive('addParam')">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import uploldcom from "@/components/Upload/index.vue";
import {pastCreate,pastDetail,pastUpdate} from "@/api/active"
export default {
  data() {
    return {
      id: "",
      addParam: {
        activityName:'',
        orderNumber:'',
        homeUrl:'',
        activityLink:'',
        startTime:'',
        status:'1'
      },
      rules: {
        activityName: [
          { required: true, message: "请填写活动名称", trigger: "blur" },
        ],
        orderNumber: [
          { required: true, message: "请填写排序序号", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请选择活动开始时间", trigger: "change" },
        ],
      },
    };
  },
  components: {
    uploldcom
  },
  methods: {
    homeUrluploadimg(val){
      this.addParam.homeUrl = val;
    },
    getActivityInfoDetail(){
      pastDetail({
        id:this.id
      }).then((res)=>{
        if(res.code == "0"){
          for(let index in this.addParam){
            if(res.data[index]){
              this.addParam[index] = res.data[index]
            }
          }
        }
      })
    },
    
    saveActive(addParam){
      this.$refs[addParam].validate(valid => {
        if (valid) {
          let params = {};
          for(let index in this.addParam){
            params[index] = this.addParam[index]
          }
          params.orderNumber = Number(params.orderNumber)
          if(this.id){
            params.id = this.id
            pastUpdate(params).then((res)=>{
              if(res.code == "0"){
                this.$message({
                  message: '活动编辑成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
            })
          }else{
            pastCreate(params).then((res)=>{
              if(res.code == "0"){
                this.$message({
                  message: '活动新增成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
            })
          }
        }
      });
      // let params = {};
      
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getActivityInfoDetail()
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
</style>
