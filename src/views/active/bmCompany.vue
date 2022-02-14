<template>
  <div class="app-container">
    <commonForm :inline="true" :data="getInfoData" :formConfig="formConfig">
    </commonForm>
    <el-table
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="forms"
    >
      <el-table-column
        prop="companyId"
        width="120"
        label="公司序号"
      ></el-table-column>
      <el-table-column
        prop="companyName"
        min-width="155"
        label="参展单位名称"
      ></el-table-column>
      <el-table-column
        prop="number"
        min-width="155"
        label="排序编号"
      ></el-table-column>
      <el-table-column
        prop="totalVotes"
        width="130"
        label="总票数"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="onlineVotes"
        label="线上获得票数"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <!-- <el-table-column label="状态">
        <template slot-scope="scope">
        <span>{{scope.row.validStatus|companyStatusFilter}}</span>
      </template>
      </el-table-column>  -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <span class="spancs" @click="updateActiveCompany(scope.row.id)">编辑</span>
          <span class="spancs" @click="detelated(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="getInfoData.offset"
      :limit.sync="getInfoData.limit"
      @pagination="getList"
    />

    <!-- 添加单位 -->
    <el-dialog title="添加参展单位" width="600px" :visible.sync="dialogTableVisible">
      <div class="search">
        <el-input class="earchelinput" v-model="companyName" placeholder=""></el-input>
        <el-button type="primary" @click="getAllActivityCompanyList">搜索</el-button>
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
        @pagination="getAllActivityCompanyList"
      />
      <el-button class="corfims" type="success" @click="corfimsAdd">确定添加</el-button>
    </el-dialog>

    <!-- //编辑单位 -->
    <el-dialog :title="showCompanyName" width="600px"  :visible.sync="dialogFormVisible">
      <el-form :model="updateCompany" label-width="100px">
        <el-form-item label="编号">
          <el-input class="earchelinput" v-model="updateCompany.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分享标题">
          <el-input class="earchelinput" v-model="updateCompany.shareTitle" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="分享图片底图">
          <uploldcom
            :isone="true"
            :imgurles="updateCompany.companySharePicUrl"
            @uploadSuccess = "homeUrluploadimg"
          ></uploldcom>
        </el-form-item>
        <el-form-item label="基础票数">
          <el-input class="earchelinput" v-model="updateCompany.baseVotes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUpdateactiveCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonForm from "@/components/CommonForm";
import pagination from "@/components/Pagination";
import uploldcom from "@/components/Upload/index.vue";
import {getActivityCompanyList} from "@/api/company"
import {companyGetActivityCompanyList,activityCompanyAdd,companyDelete,companyDetail,companyUpdate} from "@/api/active"

export default {
  components:{
    commonForm,
    pagination,
    uploldcom
  },
  filters: {
    companyStatusFilter (val) {
      let statusList = {
        '0':'未上架',
        '1':'已上架',
        '2':'已下架'
      }
      return statusList[val]
    },
  },
  data() {
    return {
      tableData:[],
      total:0,
      companyName:'',
      getInfoData: {
        limit: 10,
        offset: 1,
        activityId:'',
        companyName: "",
        startTime:'',
        endTime:'',
        createDelTime:[],
      },
      formConfig: {
        formItemList: [
          {
            label: "",
            value: "companyName",
            clearable: true,
            placeholder: "参展单位名称",
            type: "input",
          },
          {
            label: "",
            value: "createDelTime",
            clearable: true,
            startPlaceholder: "创建开始日期",
            endPlaceholder: "创建结束日期",
            type: "daterange",
            dateFormate: "yyyy-MM-dd",
          },
        ],
        operate: [
          {
            name: "搜索",
            value: "primary",
            type: "button",
            handleClick: this.search,
            authBtn: true,
          },
          {
            name: "清空搜索条件",
            value: "",
            type: "button",
            handleClick: this.clearInput,
            authBtn: true,
          },
          {
            name: "添加单位",
            value: "success",
            type: "button",
            handleClick: this.addCompany,
            authBtn: true,
          },
        ],
      },
      dialogTableVisible:false,
      gridData:[],
      gridDataTotal:0,
      gridDataLimit: 10,
      gridDataOffset: 1,
      companyIdList:[],
      activtyId:'',
      dialogFormVisible:false,
      updateCompany:{
        id:'',
        number:'',
        companySharePicUrl:'',
        baseVotes:'',
        shareTitle:'',
      },
      showCompanyName:'',
      activityId:'',
    }
  },
  created() {
    this.activtyId = Number(this.$route.query.activtyId)
    this.getInfoData.activityId = this.activtyId;
    this.getList();
  },
  methods: {
    homeUrluploadimg(val){
      this.updateCompany.companySharePicUrl = val;
    },
    saveUpdateactiveCompany(){
      companyUpdate(this.updateCompany).then((res)=>{
        if(res.code == '0'){
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    handleSelectionChange(val){
      
      this.companyIdList = val
    },
    corfimsAdd(){
      let list = [];
      if(this.companyIdList){
        for(let i =0 ;i<this.companyIdList.length;i++){
          list.push(this.companyIdList[i].id);
        }
      }
      activityCompanyAdd({
        activityId:this.activtyId,
        companyIdList:list
      }).then((res)=>{
        if(res.code == '0'){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.dialogTableVisible = false;
          this.getList();
        }
      });
    },
    updateActiveCompany(companyId){
      companyDetail({
        id:companyId
      }).then((res)=>{
        if(res.code == '0'){
          for(let index in this.updateCompany){
            this.updateCompany[index] = res.data[index];
            this.showCompanyName = res.data.companyName
          }
          // this.updateCompany.id = res.data.companyId;
          this.dialogFormVisible = true;
        }
      })
    },
    detelated(val){
      companyDelete({id:val.id}).then((res)=>{
        if(res.code == "0"){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
        this.getList();
      })
    },
    addCompany(){
      this.getAllActivityCompanyList();
    },
    getAllActivityCompanyList(){
      let offset = this.gridDataOffset-1
      getActivityCompanyList({
        companyName:this.companyName,
        startTime:'',
        endTime:'',
        validStatus:1,
        limit: this.gridDataLimit,
        offset: offset,
      }).then((res)=>{
        if(res.code == '0'){
          this.gridDataTotal = res.data.total;
          this.gridData = res.data.rows
          if(!this.dialogTableVisible) this.dialogTableVisible = true
        }
      });
    },
    //获取列表数据
    getList(){
      if(this.getInfoData.createDelTime && this.getInfoData.createDelTime.length > 0){
        this.getInfoData.startTime = this.getInfoData.createDelTime ? this.getInfoData.createDelTime[0] : "";
        this.getInfoData.endTime = this.getInfoData.createDelTime ? this.getInfoData.createDelTime[1] : "";
      }
      delete this.getInfoData.createDelTime
      let params = {}
      for(let index in this.getInfoData){
        if(index == 'offset'){
          params[index] = this.getInfoData[index]-1
        }else{
          params[index] = this.getInfoData[index]
        }
      }
      companyGetActivityCompanyList(params).then((res)=>{
        if(res.code == '0'){
          this.tableData = res.data.rows;
          this.total = res.data.total
        }
      })
    },
    //搜索触发
    search(){
      this.getList();
    },
    //清空搜索条件
    clearInput(){
      this.getInfoData = {
        limit: 10,
        offset: 1,
        activityId:'',
        companyName: "",
        startTime:'',
        endTime:'',
        createDelTime:[],
      }
      this.getList();
    },
  }
}
</script>
<style scoped lang="scss">
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
