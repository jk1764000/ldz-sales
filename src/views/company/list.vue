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
        prop="id"
        width="120"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="companyName"
        min-width="120"
        label="参展单位名称"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
        <span>{{scope.row.validStatus|companyStatusFilter}}</span>
      </template>
      </el-table-column> 
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <span class="spancs" v-if="scope.row.validStatus != 1" @click="updateCompany(scope.row.id)">编辑</span>
          <span class="spancs" v-if="scope.row.validStatus == 2 || scope.row.validStatus == 0" @click="changeCompanyStatus(scope.row.id,1)">上架</span>
          <span class="spancs" v-if="scope.row.validStatus == 1" @click="changeCompanyStatus(scope.row.id,2)">下架</span>
          <span class="spancs" @click="detelated(scope.row)" v-if="scope.row.validStatus != 1">删除</span>
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
  </div>
</template>

<script>
import commonForm from "@/components/CommonForm";
import pagination from "@/components/Pagination";
import {getActivityCompanyList,companyDelete,companyUpdate} from "@/api/company"

export default {
  components:{
    commonForm,
    pagination
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
      getInfoData: {
        limit: 10,
        offset: 1,
        companyName: "",
        startTime:'',
        endTime:'',
        validStatus:'',
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
          {
            type: "select",
            value: "validStatus",
            clearable: true,
            placeholder: "上架状态",
            options: [
              {
                label: "全部",
                value: '',
              },
              {
                label: "未上架",
                value: 0,
              },
              {
                label: "已上架",
                value: 1,
              },
              {
                label: "已下架",
                value: 2,
              }
            ],
          }
        ],
        operate: [
          {
            name: "搜索",
            value: "primary",
            type: "button",
            handleClick: this.getList,
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
            name: "创建单位",
            value: "success",
            type: "button",
            handleClick: this.addCompany,
            authBtn: true,
          },
        ],
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    updateCompany(companyId){
      this.$router.push('/company/companyAdd?id='+companyId);
    },
    changeCompanyStatus(companyid,status){
      companyUpdate({
        id:companyid,
        validStatus:status
      }).then((res)=>{
        if(res.code == "0"){
          let text = "";
          if(status == 1){
            text = "上架成功"
          }else{
            text = "下架成功"
          }
          this.$message({
            message: text,
            type: 'success'
          });
          this.getList();
        }
      });
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
      this.$router.push('/company/companyAdd');
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
      getActivityCompanyList(params).then((res)=>{
        if(res.code == '0'){
          this.tableData = res.data.rows;
          this.total = res.data.total
        }
      })
    },
    //清空搜索条件
    clearInput(){
      this.getInfoData = {
        limit: 10,
        offset: 1,
        companyName: "",
        startTime:'',
        endTime:'',
        validStatus:'',
        createDelTime:[],
      }
      this.getList();
    },
  }
}
</script>
<style scoped>
.spancs{
  margin-right: 5px;
  cursor:pointer;
  color: #67C23A;
}
</style>
