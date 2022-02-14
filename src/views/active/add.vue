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
        <el-form-item label="活动短标题" prop="title">
          <el-input v-model="addParam.title" maxlength="12"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="排序序号" prop="orderNumber">
          <el-input v-model="addParam.orderNumber" maxlength="12"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="活动起止时间" prop="time">
          <el-date-picker
            size="medium"
            v-model="addParam.time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="选择活动开始时间"
            end-placeholder="选择活动结束时间"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="结果公布时间" prop="planPublishTime">
          <el-date-picker
            size="medium"
            v-model="addParam.planPublishTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="是否在列表中显示">
           <el-radio-group v-model="addParam.isShowList">
            <el-radio :label="'0'">显示</el-radio>
            <el-radio :label="'1'">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="参展单元列表展示规则">
           <el-radio-group v-model="addParam.orderRuleType">
            <el-radio :label="'0'">按总票数大小排序</el-radio>
            <el-radio :label="'1'">按后台列表顺序排序</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      
      <div>
        <el-form-item label="基础投票次数限制方式">
           <el-radio-group v-model="addParam.voteNumberLimitType">
            <el-radio :label="'0'">每日投票次数限制</el-radio>
            <el-radio :label="'1'">总次数限制</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="投票次数">
          <el-input v-model="voteNumber"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="线上投票规则简述" prop="voteRuleDesc">
          <el-input
            style="width: 500px"
            :rows="4"
            type="textarea"
            v-model="addParam.voteRuleDesc"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="总榜名称设置" prop="oneLevelPubName">
          <el-input v-model="addParam.oneLevelPubName"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="子榜单元设置">
          <el-button type="primary" @click="addvote">添加</el-button>
          
        </el-form-item>
      </div>
      <div>
        <el-form-item label=" " v-if="twoLevelPubList && twoLevelPubList.length > 0">
          <div class="groupinfo" v-for="(item,index) in twoLevelPubList" :key="index">
            <el-input v-model="item.publishName"></el-input>
            <el-button class="delbutton" type="danger" @click="delvote(index)">删除</el-button>
          </div>
          
        </el-form-item>
      </div>
      <div>
        <el-form-item label="标签设置">
          <el-button type="primary" @click="addTag">添加</el-button>
          <!-- <el-input v-model="addParam.activityTagList"></el-input> -->
        </el-form-item>
      </div>
      <div>
        <el-form-item label=" " v-if="activityTagList && activityTagList.length > 0">
          <div class="groupinfo" v-for="(item,index) in activityTagList" :key="index">
            <el-input class="taginput" v-model="item.tagName" placeholder="标签名称"></el-input> 
            <el-input v-model="item.lessThanScore" type="number" placeholder="设置分值"></el-input>
            <span class="tas">~</span> 
            <el-input v-model="item.greaterThanScore" type="number" placeholder="设置分值"></el-input>
            <el-button class="delbutton" type="danger" @click="delTag(index)">删除</el-button>
          </div>
          
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
import {activityInfoCreate,activityInfoDetail,activityInfoUpdate} from "@/api/active"
export default {
  data() {
    return {
      id: "",
      voteNumber:'',
      twoLevelPubList:[],
      activityTagList:[],
      addParam: {
        title:'',
        orderNumber:'',
        planPublishTime:'',
        orderRuleType:'0',
        voteNumberLimitType:'0',
        dailyVoteNumberLimit:0,
        totalNumberLimit:0,
        voteRuleDesc:'',
        oneLevelPubName:'',
        twoLevelPubList:[],
        activityTagList:[],
        time: [],
        startTime:'',
        endTime:'',
        isShowList:'0',
      },
      rules: {
        title: [
          { required: true, message: "请填写活动名称", trigger: "blur" },
        ],
        
        orderNumber: [
          { required: true, message: "请填写排序序号", trigger: "blur" },
        ],
        time: [
          { required: true, message: "请选择活动起止时间", trigger: "change" },
        ],
        planPublishTime: [
          { required: true, message: "请选择公布时间", trigger: "change" },
        ],
        voteRuleDesc: [
          { required: true, message: "请选输入规则简述", trigger: "blur" },
        ],
        oneLevelPubName: [
          { required: true, message: "请输入总榜名称", trigger: "blur" },
        ],
      },
    };
  },
  components: {
  },
  methods: {
    delTag(index){
      this.activityTagList.splice(index,1);
    },
    addTag(){
      this.activityTagList.push({
        tagName:'',
        greaterThanScore:'',
        lessThanScore:'',
      })
    },
    addvote(){
      if(this.twoLevelPubList && this.twoLevelPubList >= 8){
        this.$message({
          message: '最多新增8个子榜单',
          type: 'error'
        });
        return
      }
      this.twoLevelPubList.push({
        publishName:''
      });
    },
    delvote(index){
      this.twoLevelPubList.splice(index,1);
    },
    getActivityInfoDetail(){
      activityInfoDetail({
        id:this.id
      }).then((res)=>{
        if(res.code == "0"){
          for(let index in this.addParam){
            if(res.data[index]){
              this.addParam[index] = res.data[index]
            }
          }
          if(res.data.startTime && res.data.endTime){
            this.addParam.time.push(res.data.startTime);
            this.addParam.time.push(res.data.endTime);
          }
          if(this.addParam.voteNumberLimitType == 1){
            this.voteNumber = this.addParam.totalNumberLimit
          }else{
            this.voteNumber = this.addParam.dailyVoteNumberLimit
            
          }
          this.twoLevelPubList = this.addParam.twoLevelPubList
          this.activityTagList = this.addParam.activityTagList
        }
      })
    },
    
    saveActive(addParam){
      this.$refs[addParam].validate(valid => {
        if (valid) {
           let twoLevelPubListParam = []
           let activityTagListParam = [];
          if(this.twoLevelPubList && this.twoLevelPubList.length > 0){
            for(let i = 0; i<this.twoLevelPubList.length;i++){
              let puname = {
                publishName:this.twoLevelPubList[i].publishName,
              }
              twoLevelPubListParam.push(puname)
            }
          }else{
            twoLevelPubListParam = [];
          }
          if(this.activityTagList && this.activityTagList.length > 0){
            for(let i = 0; i<this.activityTagList.length;i++){
              let puname = {
                tagName:this.activityTagList[i].tagName,
                greaterThanScore:Number(this.activityTagList[i].greaterThanScore),
                lessThanScore:Number(this.activityTagList[i].lessThanScore)
              }
              activityTagListParam.push(puname)
            }
          }else{
            activityTagListParam = [];
          }
          this.addParam.twoLevelPubList = twoLevelPubListParam;
          this.addParam.activityTagList = activityTagListParam
          this.addParam.startTime = this.addParam.time ? this.addParam.time[0] : "";
          this.addParam.endTime = this.addParam.time ? this.addParam.time[1] : "";
          delete this.addParam.time;
          if(this.addParam.voteNumberLimitType == 1){
            this.addParam.totalNumberLimit = this.voteNumber
            this.addParam.dailyVoteNumberLimit =0
          }else{
            this.addParam.dailyVoteNumberLimit = this.voteNumber
            this.addParam.totalNumberLimit =0
          }
          let params = {};
          for(let index in this.addParam){
            params[index] = this.addParam[index]
          }
          if(this.id){
            params.id = Number(this.id)
            activityInfoUpdate(params).then((res)=>{
              if(res.code == "0"){
                this.$message({
                  message: '活动编辑成功',
                  type: 'success'
                });
                this.$router.go(-1)
              }
            })
          }else{
            activityInfoCreate(params).then((res)=>{
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
