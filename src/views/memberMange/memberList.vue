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
        prop="mobilePhone"
        width="130"
        label="手机号"
      ></el-table-column>
      <el-table-column prop="createTime" label="注册时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status==1?'禁用':'启用'}}
        </template>
      </el-table-column> 
      <!-- <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <span class="block" v-if="scope.row.status==1">启用</span>
          <span class="block" v-if="scope.row.status==0">禁用</span>
        </template>
      </el-table-column> -->
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
import {getUserPageList} from "@/api/memberManage"
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
        mobilePhone: "",
        id:'',
        openid:'',
        status:'',
      },
      formConfig: {
        formItemList: [
          {
            label: "",
            value: "mobilePhone",
            clearable: true,
            placeholder: "用户手机",
            type: "input",
          },
          {
            type: "select",
            value: "status",
            clearable: true,
            placeholder: "状态",
            options: [
              {
                label: "全部",
                value: '',
              },
              {
                label: "启用",
                value: 1,
              },
              {
                label: "禁用",
                value: 0,
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
        ],
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表数据
    getList(){
      let params = {}
      for(let index in this.getInfoData){
        if(index == 'offset'){
          params[index] = this.getInfoData[index]-1
        }else{
          params[index] = this.getInfoData[index]
        }
      }
      getUserPageList(params).then((res)=>{
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
      this.getInfoData = {
        limit: 10,
        offset: 1,
        mobilePhone: "",
        id:'',
        openid:'',
        status:'',
      }
    },
  }
}
</script>
