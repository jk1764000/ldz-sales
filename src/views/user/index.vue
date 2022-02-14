<template>
  <div class="app-container">
    <commonForm :inline="true" :data="getInfoData" :formConfig="formConfig">
    </commonForm>
    <el-upload action="" :auto-upload="false" :on-change="upload" :limit="1">
      <el-button size="mini" type="success">上传文件</el-button>
    </el-upload>
    <el-table
      :data="tabData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="forms"
    >
      <el-table-column
        prop="往来帐日期"
        width="120"
        label="往来帐日期"
      ></el-table-column>
      <el-table-column
        prop="客户名称"
        width="120"
        label="客户名称"
      ></el-table-column>
      <el-table-column
        prop="商品编号"
        min-width="155"
        label="商品编号"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="商品名称"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="商品规格"
        width="160"
        label="商品规格"
      ></el-table-column>
      <el-table-column prop="商品单位" width="160" label="商品单位"></el-table-column>
      <el-table-column label="生产企业名称" width="160" prop="生产企业名称"></el-table-column>
      <el-table-column label="商品批号" width="160" prop="商品批号">
      </el-table-column>
      <el-table-column label="数量" width="160" prop="数量">
       
      </el-table-column>
      <el-table-column label="业务机构群" prop="业务机构群"></el-table-column> 
       
    </el-table>
    <!--分页器-->
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="getInfoData.offset"
      :limit.sync="getInfoData.limit"
      @pagination="function(){}"
    /> -->
  </div>
</template>

<script>
  import * as XLSX from 'xlsx/xlsx.mjs'
  import commonForm from "@/components/CommonForm";
  import { saveAs } from 'file-saver';
  export default {
    components:{
      commonForm,
    },
    data() {
      return {
        tabData:[],
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
              value: "startDelTime",
              clearable: true,
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期",
              type: "daterange",
              dateFormate: "yyyy-MM-dd",
            }
          ],
          operate: [
            {
              name: "搜索",
              value: "primary",
              type: "button",
              handleClick: function(){},
              authBtn: true,
            },
            {
              name: "清空搜索条件",
              value: "",
              type: "button",
              handleClick: function(){},
              authBtn: true,
            },
            // {
            //   name: "导出Excel",
            //   value: "success",
            //   type: "button",
            //   handleClick: function(){},
            //   authBtn: true,
            // },
            // {
            //   name: "导入Excel",
            //   value: "success",
            //   type: "button",
            //   handleClick: function(){},
            //   authBtn: true,
            // },
          ],
        },
      }
    },
    methods: {
      saveHandler(){
      
      var content = JSON.stringify(this.tabData);
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "save.json");
      },
      upload (file, fileList) {
        let files = { 0: file.raw }// 取到File
        this.readExcel(files)
      },
      readExcel (files) { // 表格导入
        var that = this
        if (files.length <= 0) { // 如果没有文件名
          return false
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
          return false
        }
        const fileReader = new FileReader()
        fileReader.onload = (ev) => {
          const data = ev.target.result
          
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]// 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
         
          this.tabData = ws
          // 重写数据
          this.$refs.upload.value = ''
        }
        fileReader.readAsBinaryString(files[0])
      }
    }
  }
</script>
