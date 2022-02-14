<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 09:58:06
 * @LastEditTime: 2019-10-23 14:20:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="upload-complate" :class="intClass">
    <div v-if="!isone">
      <vuedraggable class="wrapper" v-model="imglistes" @change="dragChange">
        <transition-group>
          <div
            class="fl fover-img imggroup"
            v-for="(item, index) in imglistes"
            :key="index + 'img'"
          >
            <img class="fl fover-img" :src="item" alt="" />
            <span class="close" v-if="canshow" @click="delateImg(index)">X</span>
          </div>
        </transition-group>
      </vuedraggable>
      <el-upload
        class="avatar-uploader"
        :action="activeUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        multiple
        :before-upload="beforeUpload"
        v-if="imglistes.length < limitnum && canshow"
      >
        <i class="uploadIcon el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div v-if="isone">
      <el-upload
        style="position: relative;"
        class="avatar-uploader"
        :action="activeUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeUpload"
      >
        <span v-if="imageUrl&&canshow" class="close" @click.stop="del">X</span>
        <video class="fover-img" v-if="imageUrl && isvedio" :src="imageUrl"></video>
        <img
          ref="img"
          v-if="imageUrl && !isvedio"
          :src="imageUrl"
          class="fover-img"
        />
        <i v-if="!imageUrl" class="uploadIcon el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import vuedraggable from "vuedraggable";
// import { qiniutoken } from '@/api/index'

// import * as qiniu from "qiniu-js";
import lrz from "lrz";
export default {
  
  props: {
    canshow:{
      type: Boolean,
      default: true
    },
    isone: {
      type: Boolean,
      default: false
    },
    isvedio:{
      type: Boolean,
      default: false
    },
    ratio: {
      type: Boolean,
      default: false
    },
    imgurles: {
      type: String,
      default: ""
    },
    imglist: {
      type: Array,
      default: () => []
    },
    limitnum: {
      type: Number,
      default: 30
    },
    limitSize: {
      type: String,
      default: '200K'
    },
    compress: {
      type: Boolean,
      default: false
    },
    intClass: {
      type: String,
      default: ""
    },
    sub: {
      type: Number,
      default: 0
    }
  },
  components: {
    vuedraggable
  },
  computed: {
    dragOptions() {
      return {
        // animation: 0,
        group: "description"
        // disabled: !this.editable,
        // ghostClass: "ghost"
      };
    }
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      num: 0,
      imglistes: [],
      imageUrl: this.imgurles,
      upToken: "",
      preUrl: "",
      indexSub: "" ,// 组件被循环时加下标
      activeUrl:process.env.VUE_APP_BASE_API+'file/uploadFile'
    };
  },
  watch: {
    imgurles(val) {
      this.imageUrl = val;
    },
    imglist: {
      handler(val) {
        this.imglistes = val;
        this.num = this.imglistes.length;
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    handleAvatarSuccess(val){
      console.log(val);
      this.imageUrl = val.data.fileUrl;
      if (!this.isone) {
        this.imglistes.push(this.imageUrl);
        let arr = [];
        if (this.imglistes.length > 20) {
          arr = this.imglistes.splice(20);
        }
        this.$emit("uploadSuccess", this.imglistes, this.sub);
      } else {
        this.$emit("uploadSuccess", this.imageUrl, this.sub);
      }
    },
    del () {
      this.imageUrl = ''
      this.$emit("uploadSuccess", this.imageUrl, this.sub)
    },
    
    delateImg(index) {
      this.imglistes.splice(index, 1);
      this.$emit("uploadSuccess", this.imglistes);
    },
    
    beforeUpload(file) {
      if (this.ratio) {
        let vm = this;
        let reader = new FileReader();
        reader.readAsDataURL(file); //这里把一个文件用base64编码,
        reader.onload = function(e) {
          let img = new Image();
          img.src = e.target.result; //获取编码后的值,也可以用this.result获取
          img.onload = function() {
            let width = this.width;
            let height = this.height;
            let ratio = width / height;
            if (ratio != 1.25) {
              vm.$message({
                type: "error",
                message: "请上传5:4比例的分享图！"
              });
              return;
            } else {
              vm.doupload(file);
            }
          };
        };
      } else if(!this.isvedio){

        this.doupload(file);
      }
    },
    doupload(file) {
      if (this.num >= this.limitnum) {
        this.$message.error('已达到最大上传数量了');
        return false;
      } else {
        this.num++;
      }
      let isLtbig = file.size / 1024 < 500;//最大500k
      if (!isLtbig) {
        this.$message.error('上传头像图片大小不能超过 500k!');
        return false
      }else{
        return isLtbig
      }
    },
    dragChange() {
      this.$emit("uploadSuccess", this.imglistes, this.sub);
    },
  }
};
</script>
<style scoped lang="scss">
.upload-complate {
  .flex{
    display: flex;
  }
  .imggroup {
    cursor: move;
    position: relative;
    margin-left: 10px;
    .close {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #ad9cde;
      position: absolute;
      top: 5px;
      right: 0;
      color: #fff;
      cursor: pointer;
    }
  }
  .fover-img {
    width: 198px;
    height: 198px;
    text-align: center;
    display: inline-block;
    // margin: 5px 5px 0 0;
  }
  .avatar-uploader {
    width: 200px;
    height: 200px;
    text-align: center;
    display: inline-block;
    // margin: 10px 5px 0 0;
    border: 1px dashed #aaa;
    border-radius: 5px;
  }
  .uploadIcon {
    width: 200px;
    height: 200px;
    line-height: 200px;
  }
}
.close {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #ad9cde;
  position: absolute;
  top: 5px;
  right: 0;
  color: #fff;
  cursor: pointer;
}
</style>
