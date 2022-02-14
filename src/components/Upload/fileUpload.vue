<template>
	<div class="upload-complate">
		<div>
			<div class="imggroup" v-for = "(item,index) in files_" :key = "index">
				<a :href="item" target="_blank" style="text-decoration: underline;">附件:{{files_Names[index]}}</a>
				<span class="close" v-if = "showdelate" @click = "deleteFile(index)">X</span>
			</div>
	    	<el-upload v-if = "showdelate"
			  class="avatar-uploader"
        :multiple="!single"
			  action="https://upload.qiniup.com/"
			  :show-file-list="false"
			  :before-upload="beforeUpload">
			  <i class="uploadIcon el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
	</div>
</template>
<script>
	import * as qiniu from 'qiniu-js'
	import { qiniutoken } from '@/api/index'
	export default{
		props:{
			files:{
				type: Array,
				default:() => []
	  },
	  showdelate:{
		  type:Boolean,
		  default:true,
	  },
      single: {
        type: Boolean,
        default: false
      },
      chekType: {
        type: String,
        default: ''
      }
		},
		data(){
			return{
				files_: [], // 组件私有变量
				files_Names: [], // 组件私有变量file的名称
				upToken: "",
				preUrl: ""
			}
		},
		watch:{
			files(val){
				// console.log('---val---', val ,typeof val)
				this.files_ = val
				this.files_Names = []
				val.map((item) => {
					let _arr = item.split('/')
					this.files_Names.push(_arr[_arr.length - 1])
				})
			}
		},
		methods:{
			deleteFile(index){
				this.files_Names.splice(index, 1);
				this.files_.splice(index, 1)
				this.$emit('uploadSuccess', this.files_)
			},
			//获取七牛密钥
			getAuth (params = {},file) {
				qiniutoken("").then(res => {
		        if (res.respCode == "00") {
							this.upToken = res.respData.upToken;
							this.preUrl = res.respData.preUrl;
							this.qiniuUpload(file);
						}
		      })
		    },
		    beforeUpload(file) {
          console.log(this.chekType, this.file, this.files,this.files.type, '-----chekType')
          // if (this.chekType && this.file.type.indexOf(this.chekType != -1)) {
          //   this.$message({
          //     type: 'error',
          //     message: `请上传${this.checkType}格式文件`
          //   })
          //   return
          // }
          // this.single单个上传标识
          if (this.single && this.files.length > 0) {
            this.$message({
              type: 'error',
              message: '只能上传一份合同!'
            })
            return
          }
		      this.getAuth('',file)
		    },
		    qiniuUpload(file) {
		      const timestamp = new Date().valueOf()
		      const key = `niuba-admin/${timestamp}/${file.name}`
		      var putExtra = {
		        fname: '',
		        params: {},
		        mimeType: null
		      }
		      var config = {
		        useCdnDomain: true
		      }
		      var observable = qiniu.upload(file, key, this.upToken, putExtra, config)
		      observable.subscribe(this.next, this.error, this.complete)
		      this.fullscreenLoading = false
		    },
		    complete (res) {
					let file = `${this.preUrl}/${res.key}`
					this.files_.push(file);
		      this.$emit('uploadSuccess', this.files_)
		    }
		}
	}
</script>
<style scoped lang="scss">
	.upload-complate{
		.imggroup{
			position: relative;
			.close{
				width: 20px;
				height:20px;
				line-height: 20px;
				margin-left: 20px;
				background: #ad9cde;
				color: #fff;
				cursor: pointer;
				display: inline-block;
        text-align: center;
			}
		}
		.avatar-uploader{
			width: 200px;
			height:200px;
			text-align: center;
			display:inline-block;
			margin:5px 5px 0 0;
			border:1px dashed #aaa;
			border-radius:5px;
		}
		.uploadIcon{
			width: 200px;
			height:200px;
			line-height: 200px;
		}
	}
</style>
