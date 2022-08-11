/** * 基础菜单 商品管理 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <div class="handle-box">
      <div></div>
      <div>
        <el-input
          size="mini"
          v-model="name"
          placeholder="输入关键字搜索"
          class="handle-input"
        ></el-input>
        <el-button type="primary" size="mini" @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="display margin_tb">
      <div>
        <el-button type="primary" size="mini" @click="handleEdits"
          >新增</el-button
        >
        <el-select
          v-model="value"
          placeholder="默认排序"
          size="mini"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" size="mini">导出Excel</el-button>
      </div>
    </div>
    <!--列表-->
    <el-table ref="multipleTable" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="xmno" label="项目编号"> </el-table-column>
      <el-table-column prop="proname" label="项目名称"> </el-table-column>
      <el-table-column prop="profullname" label="项目全称"> </el-table-column>
      <el-table-column prop="fuzeren" label="负责人"> </el-table-column>
      <el-table-column prop="Created" label="添加时间"> </el-table-column>
      <el-table-column label="操作" key="slot">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>
    <!-- 编辑界面 -->
    <el-dialog
      :title="title"
      :visible.sync="editFormVisible"
      width="30%"
      @click="closeDialog"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
      >
        <el-form-item label="项目编号" prop="xmno">
          <el-input
            v-model="editForm.xmno"
            placeholder="请选择项目编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="proname">
          <el-input
            v-model="editForm.proname"
            placeholder="请选择项目编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目全称" prop="profullname">
          <el-input
            v-model="editForm.profullname"
            placeholder="请选择项目编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加时间" required>
          <el-col :span="11">
            <el-form-item prop="created">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
                v-model="editForm.created"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="submitForm('editForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, userSave, deptDelete, editlist } from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        xmno: "",
        proname: "",
        profullname: "",
        created: ""
        // token: sessionStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        proname: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        xmno: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        profullname: [
          { required: true, message: "请输入部门代码", trigger: "blur" }
        ]
      },
      formInline: {
        page: 0,
        limit: 10,
        varLable: "",
        varName: "",
        token: sessionStorage.getItem("logintoken")
      },
      // 删除部门
      seletedata: {
        ids: "",
        token: sessionStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      tableData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 0,
        pageSize: 10,
        total: 10
      },
      options: [
        {
          value: "选项1",
          label: "编号正序"
        },
        {
          value: "选项2",
          label: "编号倒序"
        },
        {
          value: "选项3",
          label: "时间正序"
        },
        {
          value: "选项4",
          label: "时间倒序"
        }
      ],
      value: "",
      name: "",
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
    handleEdits() {
      this.title = "添加";
      this.editFormVisible = true;
    },
    handleSearch() {
      this.getdata();
    },
    // 获取公司列表
    getdata() {
      this.loading = true;
      var data = {
        keyowrd: this.name,
        PageIndex: this.formInline.page,
        PageSize: this.formInline.limit
      };
      userList(data)
        .then(res => {
          console.log(res);
          this.loading = false;
          if (res.code == 0) {
            this.tableData = res.data.list;
            this.tableData.forEach(item => {
              item.Created = item.Created.substring(0, 10);
            });
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
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        this.title = "编辑";
        this.editForm.xmno = row.xmno;
        this.editForm.proname = row.proname;
        this.editForm.profullname = row.profullname;
        this.editForm.created = row.Created;
        this.dataid = row.ID;
      } else {
        this.title = "添加";
        this.editForm.xmno = "";
        this.editForm.proname = "";
        this.editForm.profullname = "";
      }
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.editForm.created = this.formatDate(this.editForm.created);
      console.log(this.editForm.created);
      this.$refs[editData].validate(valid => {
        if (valid) {
          var data = {
            jsonform: JSON.stringify(this.editForm)
          };
          console.log(data);
          if (this.title == "添加") {
            userSave(data)
              .then(res => {
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata(this.formInline);
                  this.$message({
                    type: "success",
                    message: "项目保存成功！"
                  });
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                this.editFormVisible = false;
                this.loading = false;
                this.$message.error("项目保存失败，请稍后再试！");
              });
          } else if (this.title == "编辑") {
            data.dataid = this.dataid;
            editlist(data)
              .then(res => {
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata(this.formInline);
                  this.$message({
                    type: "success",
                    message: "项目保存成功！"
                  });
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                this.editFormVisible = false;
                this.loading = false;
                this.$message.error("项目保存失败，请稍后再试！");
              });
          }
        } else {
          return false;
        }
      });
    },
    // 删除公司
    deleteUser(index, row) {
      console.log(row);
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deptDelete({ dataid: row.ID })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "项目已删除!"
                });
                this.getdata();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("项目删除失败，请稍后再试！");
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
.margin_tb {
  margin: 20px 0;
}
.handle-box {
  padding-bottom: 20px;
  display: flex;
  border-bottom: 1px solid #eee;
  margin-top: 20px;
  justify-content: space-between;
}
.handle-input {
  width: 200px;
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
