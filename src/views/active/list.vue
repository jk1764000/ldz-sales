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
        label="活动ID"
      ></el-table-column>
      <el-table-column
        prop="orderNumber"
        width="120"
        label="排序"
      ></el-table-column>
      <el-table-column
        prop="title"
        min-width="155"
        label="活动名称"
      ></el-table-column>
      <el-table-column
        width="130"
        label="排序规则类型"
      >
      <template slot-scope="scope">
        <span>{{scope.row.orderRuleType == 0?'按总票数':'按序号排序'}}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        width="160"
        label="活动开始时间"
      ></el-table-column>
      <el-table-column prop="endTime" width="160" label="活动结束时间"></el-table-column>
      <el-table-column label="创建时间" width="160" prop="createTime"></el-table-column>
      <el-table-column label="活动开屏页面链接" width="160">
        <template slot-scope="scope">
          <span>{{'/pages/index/main?id='+scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动投票首页链接" width="160">
        <template slot-scope="scope">
          <span>{{'/pages/activeindex/main?activityId='+scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态">
        <template slot-scope="scope">
          <span>{{scope.row.activityStatus|activityStatusFilter}}</span>
        </template>
      </el-table-column> 
      <el-table-column label="上下架状态" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.validStatus|validStatusFilter}}</span>
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
                <span class="block" @click="goNextPage('/active/add?id='+scope.row.id)">
                  活动编辑
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="block" @click="goNextPage('/active/openScreen?id='+scope.row.id)">
                  开屏页编辑
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="block" @click="goNextPage('/active/activityContent?activtyId='+scope.row.id)">
                  内容编辑
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="block" @click="goNextPage('/active/bmCompany?activtyId='+scope.row.id)">
                  报名单位管理
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="block" @click="goNextPage('/active/ranking?activityId='+scope.row.id)">
                  排名管理
                </span>
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.validStatus ==1">
                <span class="block" @click = "changeStatus(scope.row,2)">
                  下架
                </span>
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.validStatus !=1">
                <span class="block" @click = "changeStatus(scope.row,1)">
                  上架
                </span>
              </el-dropdown-item>
              <!-- <el-dropdown-item v-if="scope.row.activityStatus	 == 2">
                <span class="block" @click = "openresult(scope.row)">
                  公布
                </span>
              </el-dropdown-item> -->
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
import {getActivityInfoList,activityInfoDelete,activityInfoStatus} from "@/api/active.js"

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
        title:'',
        startStartTime: "",
        endStartTime: "",
        startCreateTime:'',
        endCreateTime:'',
        activityStatus:'',
        validStatus:'',
        startDelTime: [],
        createDelTime: [],
      },
      formConfig: {
        formItemList: [
          {
            label: "",
            value: "title",
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
            type: "daterange",
            dateFormate: "yyyy-MM-dd",
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
            value: "activityStatus",
            clearable: true,
            placeholder: "活动状态",
            options: [
              {
                label: "全部",
                value: "",
              },
              {
                label: "未开始",
                value: 0,
              },
              {
                label: "进行中",
                value: 1,
              },
              {
                label: "未公布",
                value: 2,
              },
              {
                label: "已公布",
                value: 3,
              },
            ],
          },
          {
            type: "select",
            value: "validStatus",
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
    activityStatusFilter (val) {
      let statusList = {
        '0':'未开始',
        '1':'进行中',
        '2':'未公布',
        '3':'已公布'
      }
      return statusList[val]
    },
    validStatusFilter(val){
       let validStatus = {
        '0':'未上架',
        '1':'已上架',
        '2':'已下架'
      }
      return validStatus[val]
    }
  },
  created() {

    this.getList();
  },
  methods: {
    openresult(val){},
    changeStatus(val,status){
      activityInfoStatus({
        id:val.id,
        activityStatus:val.activityStatus,
        validStatus:status
      }).then((res)=>{
        if(res.code == '0'){
          if(status == 1){
            this.$message({
              type: 'success',
              message: '上架成功!'
            });
          }else{
            this.$message({
              type: 'success',
              message: '下架成功!'
            });
          }
          this.getList();
        }
      });
    },
    delateActive(val){
      this.$confirm('是否删除此活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        activityInfoDelete({'id':val}).then((res)=>{
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
      getActivityInfoList(params).then((res)=>{
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
        title:'',
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
      this.$router.push('/active/add');
    },
  }
}
</script>
