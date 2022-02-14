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
        prop="orderNumber"
        width="120"
        label="排序"
      ></el-table-column>
      <el-table-column
        prop="activityName"
        min-width="155"
        label="活动名称"
      ></el-table-column>
      <el-table-column
        prop="startTime"
        width="160"
        label="活动开始时间"
      ></el-table-column>
      <el-table-column prop="activityLink" width="160" label="配置链接"></el-table-column>
      <el-table-column label="创建时间" width="160" prop="createTime"></el-table-column>
      
      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.status|validStatusFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-dropdown size="small" trigger="click">
            <el-button size="mini" type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span class="block" @click="goNextPage('/active/addHistroyActive?id='+scope.row.id)">
                  编辑
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="block" @click = "delateActive(scope.row.id)">
                  删除
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import {pastDelete,getActivityPastList} from "@/api/active.js"


export default {
  components:{
    commonForm,
    pagination
  },
  data() {
    return {
      tableData:[],
      total:0,
      getInfoData: {
        limit: 10,
        offset: 1,
        activityName:'',
        startStartTime: "",
        endStartTime: "",
        startCreateTime:'',
        endCreateTime:'',
        status:'',
        startDelTime: [],
        createDelTime: []
      },
      formConfig: {
        formItemList: [
          {
            label: "",
            value: "activityName",
            clearable: true,
            placeholder: "活动名称",
            type: "input",
          },
          {
            label: "",
            value: "startDelTime",
            clearable: true,
            startPlaceholder: "活动开始日期",
            endPlaceholder: "活动结束日期",
            type: "datetimerange",
            dateFormate: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "",
            value: "createDelTime",
            clearable: true,
            startPlaceholder: "创建开始日期",
            endPlaceholder: "创建结束日期",
            type: "datetimerange",
            dateFormate: "yyyy-MM-dd HH:mm:ss",
          },
          {
            type: "select",
            value: "status",
            clearable: true,
            placeholder: "上下架状态",
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
            name: "创建活动",
            value: "success",
            type: "button",
            handleClick: this.addActive,
            authBtn: true,
          },
        ],
      },
    }
  },
  filters: {
    validStatusFilter(val){
       let validStatus = {
        '0':'已上架',
        '1':'已下架'
      }
      return validStatus[val]
    }
  },
  created() {

    this.getList();
  },
  methods: {
    delateActive(val){
      this.$confirm('是否删除此活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pastDelete({'id':val}).then((res)=>{
          if(res.code == "0"){
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      })
    },
    goNextPage(url){
      this.$router.push(url)
    },
    //获取列表数据
    getList(){
      if(this.getInfoData.startDelTime && this.getInfoData.startDelTime.length > 0){
        this.getInfoData.startStartTime = this.getInfoData.startDelTime ? this.getInfoData.startDelTime[0] : "";
        this.getInfoData.endStartTime = this.getInfoData.startDelTime ? this.getInfoData.startDelTime[1] : "";
      }
      delete this.getInfoData.startDelTime
      if(this.getInfoData.createDelTime && this.getInfoData.createDelTime.length > 0){
        this.getInfoData.startCreateTime = this.getInfoData.createDelTime ? this.getInfoData.createDelTime[0] : "";
        this.getInfoData.endCreateTime = this.getInfoData.createDelTime ? this.getInfoData.createDelTime[1] : "";
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
      getActivityPastList(params).then((res)=>{
        console.log(res);
        if(res.code == "0"){
          console.log(res);
          this.tableData = res.data.rows;
          this.total = res.data.total
        }
      });
    },
    //搜索触发
    search(){
      this.getList();
    },
    //清空搜索条件
    clearInput(){
      this.getInfoData= {
        limit: 10,
        offset: 1,
        activityName:'',
        startStartTime: "",
        endStartTime: "",
        startCreateTime:'',
        endCreateTime:'',
        activityStatus:'',
        validStatus:'',
        startDelTime: [],
        createDelTime: [],
      }
      this.getList();
    },
    //点击创建活动
    addActive(){
      this.$router.push('/active/addHistroyActive');
    },
  }
}
</script>
