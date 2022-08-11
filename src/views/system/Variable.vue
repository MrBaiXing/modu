/** * 系统管理 系统环境变量 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <div class="handle-box">
      <div class="display"></div>
      <div>
        <el-input
          size="mini"
          v-model="name"
          placeholder="输入关键字搜索"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div style="margin:20px 0">
      <el-button size="mini" type="primary" @click="quanxuan">全选</el-button>
      <el-button size="mini" type="primary" @click="oneyidu"
        >标为已读</el-button
      >
      <el-button size="mini" type="primary" @click="quanbuyidu">全部已读</el-button>
      <el-button size="mini" type="danger">批量删除</el-button>
    </div>
    <!--列表-->
    <div>
      <div v-for="(item, index) in listData" :key="index" class="box">
        <div class="red" style="margin:auto 10px;width:20px">
          <el-checkbox-group v-model="item.checked">
            <el-checkbox
              v-model="item.checked"
              @change="handleCheckedCitiesChange(item.ID, item.checked)"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="red">
          <p style="font-size:19px">{{ item.title }}</p>
          <span>{{ item.content }}</span>
          <div
            style="display:flex;justify-content: space-between;margin:20px 0"
          >
            <span style="color:#999">时间:{{ item.Created }}</span
            ><span style="color:#f00" @click="deleteUser(item.ID)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>
  </div>
</template>

<script>
import {
  variableList,
  variableSave,
  variableDelete,
  variableEdit
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      // 删除
      seletedata: {
        ids: "",
        token: sessionStorage.getItem("logintoken")
      },
      formInline: {
        page: 0,
        limit: 10,
        machineNo: "",
        orderNo: "",
        transId: "",
        payType: 0,
        orderStatus: 0,
        token: sessionStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 0,
        pageSize: 10,
        total: 10
      },
      name: "",
      checkList: []
    };
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    quanbuyidu(){
 var id = "";
      this.listData.forEach(item => {
        id += item.ID + ",";
      });
      var data = {
        type: "1",
        xxids: id
      };
      variableSave(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
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
        })
    },
    oneyidu() {
      var id = "";
      this.checkList.forEach(item => {
        id += item + ",";
      });
      console.log(id);
      var data = {
        type: "1",
        xxids: id
      };
      variableSave(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
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
        })
    },
    handleCheckedCitiesChange(value, bool) {
      if (bool == true) {
        this.checkList.push(value);
      } else {
        this.checkList.forEach((item, index) => {
          if (item == value) {
            this.checkList.splice(index, 1);
          }
        });
      }
    },
    quanxuan() {
      if (this.checkList.length == this.listData.length) {
        console.log("全选了");
      } else {
        this.listData.forEach(item => {
          this.checkList.push(item.ID);
          item.checked = true;
        });
      }
    },
    // 获取数据方法
    getdata(parameter) {
      this.loading = true;
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      var data = {
        keyowrd: this.name,
        PageIndex: parameter.page,
        PageSize: parameter.limit
      };
      variableList(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            var linshi = "";
            res.data.list.forEach(item => {
              item.checked = false;
              linshi = item.Created.split("T");
              item.Created = linshi[0] + "  " + linshi[1];
            });
            this.listData = res.data.list;

            // 分页赋值
            this.pageparm.currentPage = this.formInline.page;
            this.pageparm.pageSize = this.formInline.limit;
            this.pageparm.total = res.data.total;
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("菜单加载失败，请稍后再试！");
        });
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },

    // 删除权限
    deleteUser(index) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          variableDelete({ dataid: index })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "已删除"
                });
                this.getdata(this.formInline);
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
    }
  }
};
</script>

<style scoped>
.red {
  width: 100%;
  /* border: solid 1px #f00; */
}
body {
  background-color: #fff;
}
.box {
  display: flex;
  border-bottom: solid 1px #999;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}
.handle-box {
  padding-bottom: 20px;
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
.display {
  display: flex;
  justify-content: space-between;
}
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>
