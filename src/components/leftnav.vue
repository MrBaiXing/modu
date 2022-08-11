/** * 左边菜单 */
<template>
   <div class="sidebar-container">
      <div class="logobox">
      <!-- <img class="logoimg" src="../assets/img/logo.png" alt="">
       -->
       <span style="color:#fff">特种设备后台管理系统</span>
    </div>
    <div class="box">

      <el-scrollbar  style="height:250%;width:240px">
        <el-menu
          router
          mode="vertical"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <sidebar-item v-for="menu in allmenu" :key="menu.url" :item="menu" />
        </el-menu>
      </el-scrollbar>
    </div>
    </div>
</template>
<script>
import { menu } from "../api/userMG";
import SidebarItem from "./common/leftSub.vue";
export default {
  name: "leftnav",
  components: { SidebarItem },
  data() {
    return {
      collapsed: false,
      allmenu: []
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    var params = {};
    menu(params)
      .then(res => {
        // console.log(res);
        // console.log(JSON.stringify(res))
        if (res.code == 0) {
          this.allmenu = res.list;
        } else {
          this.$message.error(res.msg);
          return false;
        }
      })
      .catch(err => {
        this.$message.error("菜单加载失败，请稍后再试！");
      });
    // 监听
    this.$root.Bus.$on("toggle", value => {
      console.log(value);
      this.collapsed = !value;
    });
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
 ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #eee;
        border-radius: 3px;
    }
        /* .box {
        width: 0px;
        height: 100%;
        background: aliceblue;
         white-space: nowrap;
    } */
    .el-scrollbar {
        height: 100%;
    }
   .box  .el-scrollbar__wrap {
        overflow: scroll;
        width: 110%;
        height: 120%;
    }
</style>
