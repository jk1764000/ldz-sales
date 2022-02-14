<template>
  <div class="add-project-wrap">
    <h2 class="editer-room">投票首页设置</h2>
    <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="addParam"
      ref="addParam"
    >
      <div>
        <el-form-item label="活动首页大图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.homeUrl"
            @uploadSuccess = "homeUrluploadimg"
          ></uploldcom>
          <p class="tips">上传图片，建议上传1:1，大小小于500k </p>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动首页视频">
          <uploldcom
            :isone="true"
            :isvedio = true
            :imgurles="addParam.homeVideo"
            @uploadSuccess = "uploadHomeVideo"
          ></uploldcom>
          <p class="tips">上传图片，建议上传比列16:9 </p>
        </el-form-item>
        
      </div>
      <div>
        <el-form-item label="视频封面图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.homeVideoCover"
            @uploadSuccess = "uploadhomeVideoCover"
          ></uploldcom>
          <p class="tips">上传图片，建议上传比列16:9 </p>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动介绍页">
          <uploldcom
            :isone="false"
            :imglist="activityDescUrlList"
            @uploadSuccess = "uploadactivityDescUrlList"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动列表页头图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.voteDetailsUrl"
            @uploadSuccess = "uploadvoteDetailsUrl"
          ></uploldcom>
          <p class="tips">上传图片，建议上传比列4:3，大小小于500k </p>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="结果页头图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.resultHeadPicUrl"
            @uploadSuccess = "uploadvoteresultHeadPicUrl"
          ></uploldcom>
          <p class="tips">上传图片，建议上传比列4:3，大小小于500k </p>
        </el-form-item>
      </div>
      <h2 class="editer-room">分享设置</h2>
      <div>
        <el-form-item label="活动分享小图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.shareUrl"
            @uploadSuccess = "uploadshareUrl"
          ></uploldcom>
          <p class="tips">上传图片，建议上传比列5:4，大小小于500k </p>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分享短介绍">
          <el-input
            style="width: 500px"
            :rows="4"
            type="textarea"
            v-model="addParam.shareDesc"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分享海报背景图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.sharePosterBackUrl"
            @uploadSuccess = "uploadsharePosterBackUrl"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="结果分享海报背景图">
          <uploldcom
            :isone="true"
            :imgurles="addParam.shareResultPosterBackUrl"
            @uploadSuccess = "uploadshareResultPosterBackUrl"
          ></uploldcom>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动短介绍">
          <el-input
            style="width: 500px"
            :rows="4"
            type="textarea"
            v-model="addParam.activityDesc"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="得分排名介绍">
          <el-input
            style="width: 500px"
            :rows="4"
            type="textarea"
            v-model="addParam.scoreRankDesc"
          ></el-input>
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
import {activityContentCreate,contentDetail,contentUpdate} from "@/api/active"
export default {
  data() {
    return {
      activityDescUrlList:[],
      addParam: {
        activityId:'',
        homeUrl:'',
        homeVideo:'',
        homeVideoCover:'',
        voteDetailsUrl:'',
        shareUrl:'',
        shareDesc:'',
        sharePosterBackUrl:'',
        shareResultPosterBackUrl:'',
        activityDesc:'',
        scoreRankDesc:'',
        resultHeadPicUrl:'',
      },
      updateFlage:false,
    };
  },
  components: {
    uploldcom
  },
  methods: {
    uploadactivityDescUrlList(val){
      this.addParam.activityDescUrlList = val;
    },
    getdetail(){
      contentDetail({
        activityId:this.addParam.activityId
      }).then((res)=>{
        if(res.code == '0'){
          if(res.data){
            this.activityDescUrlList = [];
            this.updateFlage = true
            if(res.data.resourceList){
              for(let i=0;i<res.data.resourceList.length;i++){
                this.activityDescUrlList.push(res.data.resourceList[i].resourceUrl)
              }
            }
             
            for(let index in this.addParam){
              this.addParam[index] = res.data[index]
            }
          }else{
            this.updateFlage = false;
          }
        }
      });
    },
    saveActive(){
      this.addParam.activityDescUrlList = this.activityDescUrlList
      if(this.updateFlage){
        contentUpdate(this.addParam).then((res)=>{
          if(res.code == "0"){
            this.$message({
              message: '内容编辑成功',
              type: 'success'
            });
            this.$router.go(-1)
          }
        });
      }else{
        activityContentCreate(this.addParam).then((res)=>{
          if(res.code == "0"){
            this.$message({
              message: '内容新增成功',
              type: 'success'
            });
            this.$router.go(-1)
          }
        });
      }
      
    },
    uploadshareResultPosterBackUrl(val){
      this.addParam.shareResultPosterBackUrl = val;
    },
    uploadsharePosterBackUrl(val){
      this.addParam.sharePosterBackUrl = val
    },
    uploadshareUrl(val){
      this.addParam.shareUrl = val
    },
    uploadvoteDetailsUrl(val){
      this.addParam.voteDetailsUrl = val
    },
    uploadvoteresultHeadPicUrl(val){
      this.addParam.resultHeadPicUrl = val
    },
    uploadhomeVideoCover(val){
      this.addParam.homeVideoCover = val;
    },
    uploadHomeVideo(val){
      this.addParam.homeVideo = val;
    },
    homeUrluploadimg(val){
      this.addParam.homeUrl = val;
    }
  },
  created() {
    this.addParam.activityId = Number(this.$route.query.activtyId);
    this.getdetail();
  },
};
</script>
<style scoped lang="scss">
.add-project-wrap {
  min-width: 900px;
  padding: 20px 20px 60px 40px;
}
.footer{
  padding-left: 160px;
}
.tips{
  color: #999;
  line-height: 14px;
  margin:0 0 10px;
}
</style>
