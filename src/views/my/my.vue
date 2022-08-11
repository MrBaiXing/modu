<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box">
      <div class="box_left">
        <div style="margin: 30px auto 0;width:100px;">
          <el-image
            class="img"
            :src="imgurl + src.touxiang || url"
            :preview-src-list="srcList"
          >
          </el-image>
          <input type="file" accept="" @change="handleFile" ref="picers" class="hiddenInput"/>
          <p class="demonstration" @click.stop="uploadHeadImg">修改头像</p>
        </div>
        <div style="color:#000; margin-top:30px">
          <div class="nicheng">
            <span style="color:#999">昵称</span
            ><span>{{ tableDate.username }}</span>
          </div>
          <div class="nicheng">
            <span style="color:#999">电话</span
            ><span>{{ tableDate.telphone }}</span>
          </div>
          <div class="nicheng">
            <span style="color:#999">邮箱</span
            ><span>{{ tableDate.email }}</span>
          </div>
        </div>
      </div>
      <div class="box_right">
        <p>编辑资料</p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="个人资料" name="first">
            <div class="red" style="margin-top:30px">
              <el-form label-width="80px" :model="tableDate" ref="rules">
                <el-form-item label="昵称">
                  <el-input v-model="tableDate.username"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="tableDate.telphone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="tableDate.email"></el-input>
                </el-form-item>
              </el-form>
              <div style="margin-left:40px">
                <el-button type="primary" size="mini" plain @click="quxiao"
                  >取消</el-button
                ><el-button size="mini" type="primary" @click="baocun"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="second">
            <div class="red" style="margin-top:30px">
              <el-form label-width="80px" :model="listDate">
                <el-form-item label="原密码">
                  <el-input v-model="listDate.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input v-model="listDate.xpwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input v-model="listDate.pwds" show-password></el-input>
                </el-form-item>
              </el-form>
              <div style="margin-left:40px">
                <el-button type="primary" size="mini" plain @click="quxiaos"
                  >取消</el-button
                ><el-button size="mini" type="primary" @click="baocuns"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import { UpdateUserByID, GetChangePwd, GetUserByID,appFileUpload,appChangePersonTX } from "../../api/userMG";
export default {
  name: "my",
  data() {
    return {
      activeName: "first",
      src: "",
      img: "../../assets/img/my.png",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
      tableDate: {
        telphone:'',
        email:''
      },
      listDate: {
        pwd: "",
        xpwd: "",
        pwds: ""
      },
      imgurl:'http://42.51.10.118:7071',
      uploadUrl:"",
      fileList:[],
      arr: {},
      handleRemove:'',
      headimgurl: {},
      rules:{

      }
    };
  },
  created() {
    // var data = sessionStorage.getItem("userdata");
    // this.src = JSON.parse(data);
    // this.tableDate = this.src;
    // console.log(this.tableDate);
    // this.arr = this.src;
  },
  methods: {
//     uploadSectionFile(param){
//          var fileObj = param.file;
//          // FormData 对象
//          var form = new FormData();
//          // 文件对象
//          form.append("file", fileObj);
//          form.append("userId", this.userId);
//      form.append("userName", this.userName);
//        this.appFileUploadwsl(fileObj)

//    },
//     // 打开图片上传
  uploadHeadImg: function () {
   this.$el.querySelector('.hiddenInput').click()
  },
  // 将头像显示
  handleFile: function (e) {
   let $target = e.target || e.srcElement
   let file = $target.files[0]
   var reader = new FileReader()
   reader.onloadend  = (data) => {
    let res = data.target || data.srcElement
    this.url = res.result
    
    console.log(res.result.slice(23));
    var cvd = res.result.slice(23)
    this.appFileUploadwsl(cvd)
   }
   reader.readAsDataURL(file)
  },
//   appFileUploadwsl(val){
//     var data ={
//       type:'touxiang',
//       file:val
//     }
//     appFileUpload(data).then(res => {
//       console.log(res);
//         if (res.code == 0) {
//           // this.GetUserByIDwsl();
//           this.appChangePersonTXwsl(res.msg)
//           this.$message({
//             type: "success",
//             message: res.msg
//           });
//         } else {
//           this.$message({
//             type: "info",
//             message: res.msg
//           });
//         }
//       });
//   },
//   appChangePersonTXwsl(val){
// var data = {
//   touxiang:val
// }
//     appChangePersonTX(data).then(res => {
//       console.log(res);
//         if (res.code == 0) {
//           this.GetUserByIDwsl();
//           this.$message({
//             type: "success",
//             message: res.msg
//           });
//         } else {
//           this.$message({
//             type: "info",
//             message: res.msg
//           });
//         }
//       });
//   },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    quxiao() {
      console.log(this.arr);
      this.tableDate = this.arr;
    },
    baocun() {
      var jsonform = {
        username: this.tableDate.username,
        telphone: this.tableDate.telphone,
        email: this.tableDate.email,
        ID: this.tableDate.ID
      };
      var data = {
        jsonform: JSON.stringify(jsonform)
      };

      UpdateUserByID(data).then(res => {
        if (res.code == 0) {
          console.log(res);
          this.GetUserByIDwsl();
          this.$message({
            type: "success",
            message: res.msg
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    quxiaos() {
      this.listDate = {
        pwd: "",
        xpwd: "",
        pwds: ""
      };
    },
//     GetUserByIDwsl() {
//       GetUserByID({}).then(res => {
//         if (res.code == 0) {
//           console.log(res);
//           sessionStorage.setItem("userdata", JSON.stringify(res.list[0]));
//           var data = sessionStorage.getItem("userdata");
//           this.src = JSON.parse(data);
//           this.arr = this.src;
//           this.tableDate = this.src;
//         } else {
//           this.$message({
//             type: "info",
//             message: res.msg
//           });
//         }
//       });
//     },
    baocuns() {
      var data = {
        oldpwd: this.listDate.pwd,
        pwd1: this.listDate.xpwd,
        pwd2: this.listDate.pwds
      };
      GetChangePwd(data).then(res => {
        if (res.code == 0) {
          console.log(res);
          this.$message({
            type: "success",
            message: res.msg
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    }
  }
};
</script>
<style>
.item_bock {
 display: flex;
 align-items: center;
 justify-content: space-between;
 height:94px;
 width: 300px;
 padding:0px 24px 0px 38px;
 border-bottom: 1px solid #f7f7f7;
 background: #fff;
}
.head_p {
 height:132px;
}
.head_img{
 height: 90px;
}
.head_img img{
 width:90px;
 height:90px;
 border-radius:50px
}
.setting_right{
 display: flex;
 height: 37px;
 justify-content: flex-end;
 align-items: center;
}
.hiddenInput{
 display: none;
}
.caption {
 color: #8F8F8F;
 font-size: 26px;
 height: 37px;
}
.nicheng {
  /* border-buttom: 1px solid #f00; */
  border-bottom: 1px solid #999;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.box {
  display: flex;
  /* justify-content: ; */
}
.box_left {
  width: 300px;
  text-align: center;

  height: 400px;
  color: blue;
}
.box_left span {
  line-height: 40px;
}
.box_right {
  height: 400px;
  width: 600px;
  margin-left: 30px;
}
</style>
