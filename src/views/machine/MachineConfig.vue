/** * 系统管理 系统环境变量 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息管理</el-breadcrumb-item>
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
      <el-button size="mini" type="primary" @click="quanxuan(1)"
        >新增</el-button
      >
      <el-button size="mini" type="danger" @click="piliangdelece"
        >批量删除</el-button
      >
      <el-button size="mini" type="primary" @click="quanbuyidu"
        >批量发送</el-button
      >
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
            <span style="color:#999">创建时间:{{ item.Created }}</span>
            <span style="color:#999"
              >发送时间:
              {{ item.Modified }}
            </span>
            <div
              style="width:200px;justify-content: space-between;display:flex;"
            >
              <span style="color:blue; cursor: default" @click="quanxuan(item)"
                >编辑</span
              >
              <span
                style="color:#f00; cursor: default"
                @click="deleteUser(item.ID)"
                >删除</span
              >
              <!-- <span
                style="color:blue; cursor: default"
                @click="deleteUser(item.ID)"
                >发送</span
              > -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="消息标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="消息内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="region">
          <el-select v-model="region" placeholder="请选择">
            <el-option
              v-for="item in ruleForm.region"
              :key="item.xmno"
              :label="item.proname"
              :value="item.xmno"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="regions">
          <el-select v-model="regions" placeholder="请选择">
            <el-option
              v-for="item in ruleForm.regions"
              :key="item.gsno"
              :label="item.gsname"
              :value="item.gsno"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  variableList,
  variableSaves,
  variableDelete,
  variableEdit,
  appGetDataByQzjPorjectAllListNoFenye,
  appGetDataByQzjCompanyAllListNoFenye
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      title: "新增",

      dialogVisible: false,
      ruleForm: {
        name: "",
        desc: "",
        region: [],
        regions: []
      },
      region: "",
      regions: "",
      rules: {
        name: [{ required: true, message: "请输入消息标题", trigger: "blur" }],

        desc: [{ required: true, message: "请填写消息内容", trigger: "blur" }],
        region: [{ required: true, message: "请选择项目", trigger: "change" }],
        regions: [{ required: true, message: "请选择公司", trigger: "change" }]
      },
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
      checkList: [],
      dataid: ""
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
    this.appGetDataByQzjPorjectAllListNoFenyewsl();
    this.appGetDataByQzjCompanyAllListNoFenyewsl();
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    appGetDataByQzjPorjectAllListNoFenyewsl() {
      appGetDataByQzjPorjectAllListNoFenye({ keyowrd: "" }).then(res => {
        if (res.code == 0) {
          this.ruleForm.region = res.list;
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    appGetDataByQzjCompanyAllListNoFenyewsl() {
      appGetDataByQzjCompanyAllListNoFenye({ keyowrd: "" }).then(res => {
        if (res.code == 0) {
          console.log(this.ruleForm);

          this.ruleForm.regions = res.list;
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    variableDeletewsl(val) {
      variableDelete({ dataid: val }).then(res => {
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
      });
    },
    piliangdelece() {
      console.log(this.checkList);
      this.checkList.forEach(item => {
        this.variableDeletewsl(item);
        item = null;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var arr = {
            gsno: this.regions,
            xmno: this.region,
            title: this.ruleForm.name,
            content: this.ruleForm.desc,
            Created: new Date(),
            Modified: new Date()
          };
          var data = {
            jsonform: JSON.stringify(arr)
          };
          if (this.title == "新增") {
            console.log(data);

            variableSaves(data).then(res => {
              this.loading = false;
              if (res.code == 0) {
                this.dialogVisible = false;
                this.getdata(this.formInline);

                this.$message({
                  type: "success",
                  message: "保存成功"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          } else if (this.title == "编辑") {
            console.log(this.title);

            data.dataid = this.dataid;
            variableEdit(data).then(res => {
              this.loading = false;
              if (res.code == 0) {
                this.dialogVisible = false;
                this.getdata(this.formInline);

                this.$message({
                  type: "success",
                  message: "保存成功"
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
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;

      this.$refs[formName].resetFields();
    },
    quanbuyidu() {
      var id = "";
      this.listData.forEach(item => {
        id += item.ID + ",";
      });
      var data = {
        type: "1",
        xxids: id
      };
      variableSave(data).then(res => {
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
      });
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
      variableSave(data).then(res => {
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
      });
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
    quanxuan(row) {
      this.dialogVisible = true;
      if (row == 1) {
        this.ruleForm.name = "";
        this.ruleForm.desc = "";

        this.title = "新增";
      } else {
        console.log(row);
        this.ruleForm.name = row.title;
        this.ruleForm.desc = row.content;
        this.title = "编辑";
        for (let i = 0; i < this.ruleForm.region.length; i++) {
          if (this.ruleForm.region[i].xmno == row.xmno) {
            this.region = this.ruleForm.region[i].proname;
            console.log(this.region);
          }
        }
        for (let i = 0; i < this.ruleForm.regions.length; i++) {
          console.log(i);
          if (this.ruleForm.regions[i].gsno == row.gsno) {
            this.regions = this.ruleForm.regions[i].gsname;
            console.log(this.regions);
          }
        }
        this.dataid = row.ID;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
      variableList(data).then(res => {
        this.loading = false;
        if (res.code == 0) {
          var linshi = "";
          var fasong = "";
          res.data.list.forEach(item => {
            item.checked = false;
            linshi = item.Created.split("T");
            item.Created = linshi[0] + "  " + linshi[1];
            if (item.Modified) {
              fasong = item.Modified.split("T");
              item.Modified = fasong[0] + "  " + fasong[1];
            } else {
              item.Modified = "";
            }
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
