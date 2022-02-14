<template>
  <div class="app-container">
    <!-- <commonForm :inline="true" :data="getInfoData" :formConfig="formConfig">
    </commonForm> -->
    <div>
      <el-button type="success" v-if="publishType==0 && publishStatus == 0" @click="openResult">公布排名结果</el-button>
      <el-button type="primary" v-if="publishType!=0 && publishStatus != 3" @click="createdList">添加子榜单位</el-button>
    </div>
    <div class="ranklist">
      <el-button class="buttis" :type="activeButton == index?'primary':''" v-for="(item,index) in rankingList" :key="index" @click="selectPublish(item,index)">{{item.publishName}}</el-button>
    </div>
    <!-- //总榜显示 -->
    <el-table
      v-show="publishType == 0"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="forms"
    >
      <el-table-column
        prop="companyName"
        width="120"
        label="参展单位名称"
      ></el-table-column>
      <!-- <el-table-column
        prop="title"
        min-width="155"
        label="参展单元"
      ></el-table-column> -->
      
      <el-table-column
        prop="totalScore"
        min-width="155"
        label="总分数"
      ></el-table-column>
      <el-table-column
        prop="onlineVotes"
        width="130"
        label="总票数"
      >
      </el-table-column>
      <el-table-column
        prop="onlineScore"
        width="130"
        label="线上分数"
      ></el-table-column>
      <el-table-column
        prop="mysticalScore"
        width="130"
        label="神秘人分数"
      ></el-table-column>
      <el-table-column
        prop="expertScore"
        width="130"
        label="专家分数"
      ></el-table-column>
      <el-table-column
        prop="reputationScore"
        width="130"
        label="口碑分数"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <span class="spancs" @click = "changefshu(scope.row)">
            更改分数
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 子榜显示 -->
    <el-table
      v-show="publishType != 0"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="forms"
    >
      <el-table-column
        prop="rank"
        label="排名"
      >

      </el-table-column>
      <el-table-column
        prop="number"
        label="排序序号"
      ></el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间名称"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
         <span class="spancs" @click="delatecompany(scope.row)">删除</span>
         <span class="spancs" @click="changeorder(scope.row)">修改排名</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="offset"
      :limit.sync="limit"
      @pagination="getcompanyList"
    />

    <!-- 添加单位 -->
    <el-dialog title="添加参展单位" width="600px" :visible.sync="dialogTableVisible">
      <div class="search">
        <el-input class="earchelinput" v-model="companyName" placeholder=""></el-input>
        <el-button type="primary" @click="seachdata">搜索</el-button>
      </div>
      <el-table :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="id" label="id" ></el-table-column>
        <el-table-column property="companyName" label="单位名称"></el-table-column>
      </el-table>
      <pagination
        v-show="gridDataTotal > 0"
        :total="gridDataTotal"
        :page.sync="gridDataOffset"
        :limit.sync="gridDataLimit"
        @pagination="addList"
      />
      <el-button class="corfims" type="success" @click="corfimsAdd">确定添加</el-button>
    </el-dialog>

    <el-dialog :title="showcompanyName" width="600px" :visible.sync="changefenshudialog">
      <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="voteScoreParam"
      ref="voteScoreParam"
    >
      <div>
        <el-form-item label="线上分数">
          <el-input v-model="voteScoreParam.onlineScore"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="神秘人分数">
          <el-input v-model="voteScoreParam.mysticalScore"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="专家分数">
          <el-input v-model="voteScoreParam.expertScore"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="口碑分数">
          <el-input v-model="voteScoreParam.reputationScore"></el-input>
        </el-form-item>
      </div>
      <el-button class="corfims" type="success" @click="corfimsUpdate">确定修改</el-button>
    </el-form>
    </el-dialog>
    <el-dialog :title="showcompanyName" width="600px" :visible.sync="showChangeOrder">
      <el-form
      class="content"
      :inline="true"
      label-width="160px"
      :model="rank"
      ref="rank"
    >
      <div>
        <el-form-item label="排名序号">
          <el-input v-model="rank"></el-input>
        </el-form-item>
      </div>
      <el-button class="corfims" type="success" @click="corfimsUpdateRank">确定修改</el-button>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonForm from "@/components/CommonForm";
import pagination from "@/components/Pagination";
import {
  getActivityPublishList,
  getActivitySubPublishList,
  subPublishDelete,
  companyGetActivityCompanyList,
  subPublishCreate,
  companyVoteScore,
  publishPublished,
  subPublishUpdate
} from "@/api/active.js"

export default {
  components:{
    commonForm,
    pagination
  },
  data() {
    return {
      tableData:[],
      total:0,
      activityId:'',
      rankingList:[],
      activeButton:0,
      limit:10,
      offset:1,
      gridData:[],
      gridDataTotal:0,
      gridDataLimit: 10,
      gridDataOffset: 1,
      companyIdList:[],
      activityPublishId:'',
      dialogTableVisible:false,
      companyName:'',
      companyId:[],
      publishType:0,
      publishStatus:1,
      changefenshudialog:false,
      showcompanyName:'',
      voteScoreParam:{
        id:'',
        onlineScore:'',
        mysticalScore:'',
        expertScore:'',
        reputationScore:'',
      },
      showChangeOrder:false,
      rank:'',
      rankId:'',
    }
  },
  created() {
    this.activityId = this.$route.query.activityId
    this.getList();
  },
  methods: {
    changeorder(val){
      this.showChangeOrder = true;
      this.rankId = val.id;
    },
    corfimsUpdateRank(){
      subPublishUpdate({
        id:Number(this.rankId),
        rank:Number(this.rank)
      }).then((res)=>{
        this.showChangeOrder = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getcompanyList();
      });
    },
    openResult(val){
      this.$confirm('是否公布此结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        publishPublished({
          id:Number(this.activityPublishId)
        }).then((res)=>{
          if(res.code == '0'){
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.getList();
          }
        });
      })
    },
    delatecompany(val){
      this.$confirm('是否删除此单位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subPublishDelete({
          id:val.id
        }).then((res)=>{
          if(res.code == '0'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getcompanyList()
          }
        });
      })
    },
    corfimsUpdate(){
      companyVoteScore(this.voteScoreParam).then((res)=>{
        if(res.code == '0'){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.changefenshudialog = false;
          this.getcompanyList();
        }
      })
    },
    changefshu(val){
      
      this.showcompanyName = val.companyName
      this.voteScoreParam.id = val.id;
      this.changefenshudialog = true
    },
    handleSelectionChange(val){
      this.companyId = val;
    },
    corfimsAdd(){
      let companyIdList = [];
      if(this.companyId  && this.companyId.length > 0){
        for(let i =0;i<this.companyId.length;i++){
          companyIdList.push(this.companyId[i].companyId);
        }
      }
      subPublishCreate({
        activityPublishId:Number(this.activityPublishId),
        companyIdList:companyIdList
      }).then((res)=>{
        if(res.code == '0'){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.dialogTableVisible = false;
          this.getcompanyList();
        }
      })
    },
    seachdata(){
      this.gridDataOffset = 1;
      this.addList();
    },
    createdList(){
      this.gridDataOffset = 1;
      this.addList();
    },
    addList(){
      let offset = this.gridDataOffset-1
      companyGetActivityCompanyList({
        activityId:this.activityId,
        activityPublishId:'',
        companyName:this.companyName,
        startTime:'',
        endTime	:'',
        offset:offset,
        limit:10,
      }).then((res)=>{
        if(res.code == '0'){
          this.gridDataTotal = res.data.total;
          this.gridData = res.data.rows
          if(!this.dialogTableVisible) this.dialogTableVisible = true
        }
      })
    },
    
    selectPublish(val,index){
      this.activeButton = index
      this.publishType = val.publishType;
      // this.publishStatus = val.publishStatus;
      this.activityPublishId = val.id
      this.offset =1;
      this.limit = 10;
      this.total = 0;
      this.getcompanyList();
    },
    //获取列表数据
    getList(){
      getActivityPublishList({activityId:this.activityId,}).then((res)=>{
        if(res.code == "0"){
          let index = 0;
          if(res.data && res.data.length > 0){
            for(let i = 0;i<res.data.length;i++){
              if(res.data[i].publishType == 0){
                index = i;
              }
            }
          }
          let zongb = res.data[index]
          res.data.splice(index,1);
          res.data.unshift(zongb);
          this.rankingList = res.data;
          this.publishType = this.rankingList[0].publishType;
          this.publishStatus = this.rankingList[0].publishStatus;
          this.activityPublishId = this.rankingList[0].id
          this.getcompanyList();
        }
      });
    },
    getcompanyList(){
      let offsetparams = this.offset-1
       if(this.publishType == '0'){
         //总榜单
        companyGetActivityCompanyList({
          activityId:this.activityId,
          companyName:this.companyName,
          activityPublishId:Number(this.activityPublishId),
          startTime:'',
          endTime	:'',
          offset:offsetparams,
          limit:this.limit,
        }).then((res)=>{
          if(res.code == '0'){
            this.total = res.data.total;
            this.tableData = res.data.rows
          }
        })
      }else{
        //子榜单
        getActivitySubPublishList({
          offset:offsetparams,
          limit:this.limit,
          activityId:this.activityId,
          activityPublishId:Number(this.activityPublishId)
        }).then((res)=>{
          if(res.code == '0'){
            this.total = res.data.total;
            this.tableData = res.data.rows
          }
        });
      }
      
    },
    //搜索触发
    search(){
      this.getList();
    },
    //清空搜索条件
    
    //点击创建活动
    addActive(){
      this.$router.push('/active/add');
    },
  }
}
</script>
<style lang="scss" scoped>
.ranklist{
  margin:10px 0;
  .buttis{
    margin:0 10px 10px 0;
  }
}
.search{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.earchelinput{
  width: 200px!important;
  overflow: hidden;
  margin-right: 10px;
}
.corfims{
  margin: 20px 200px 0;
}
.dialog-footer{
  padding-left: 60px;
  text-align: left;
}
.spancs{
  margin-right: 5px;
  cursor:pointer;
  color: #67C23A;
}
</style>
