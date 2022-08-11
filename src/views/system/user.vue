/** * 系统管理 用户管理 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <div class="handle-box">
      <div class="display">
        <span style="line-height:30px">用户级别</span>
        <el-select
          v-model="values"
          placeholder="请选择"
          size="mini"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
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
    <div class="display margin_tb">
      <div>
        <el-button type="primary" size="mini" @click="handleEdit"
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
    <el-table
      size="small"
      :data="userData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="usertype"
        label="权限编号"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="权限名称" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.usertype == 0">系统管理员</span>
          <span v-if="scope.row.usertype == 1">项目管理员</span>
          <span v-if="scope.row.usertype == 2">公司管理员</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="xmno"
        label="隶属于项目编号"
        min-width="70"
      >
        <template slot-scope="scope">
          <!-- <el-image
            style="width: 20px; height: 20px"
            :src="url"
            fit="scale-down"
            @click="imgclick(scope.row)"
          ></el-image> -->
          <el-button size="mini" type="primary" @click="imgclick(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="editTime"
        label="日期"
        min-width="120"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.Created | timestampToTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="dataAccess(scope.$index, scope.row)"
            >权限分配</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
            >删除</el-button
          >
          <!-- <el-button size="mini" type="success" @click="resetpwd(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="mini" type="success" @click="offlineUser(scope.$index, scope.row)">下线</el-button>
          <el-button size="mini" type="success" @click="refreshCache(scope.$index, scope.row)">刷新缓存</el-button> -->
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
      @click="closeDialog('edit')"
    >
      <el-form
        label-width="100px"
        ref="editForm"
        :model="editForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="nickname">
          <el-input
            size="small"
            v-model="editForm.nickname"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="隶属于项目" prop="xmno">
          <el-input
            size="small"
            v-model="editForm.xmno"
            auto-complete="off"
            placeholder="请输入项目"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="usertype">
          <el-select
            size="small"
            v-model="editForm.usertype"
            placeholder="请选择"
            class="userRole"
          >
            <el-option label="系统管理员" value="0"></el-option>
            <el-option label="项目管理员" value="1"></el-option>
            <el-option label="公司管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            size="small"
            v-model="editForm.pwd"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userEmail">
          <el-input
            size="small"
            v-model="editForm.userEmail"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog('edit')">取消</el-button>
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
    <!-- 数据权限 -->
    <el-dialog
      title="数据权限"
      :visible.sync="dataAccessshow"
      width="30%"
      @click="closeDialog('perm')"
    >
      <el-tree
        :data="datalist"
        show-checkbox
        node-key="id"
        ref="tree"
        @getCheckedKeys="getCheckedKeys"
        :current-node-key="UserDept"
        :default-checked-keys="arrid"
        :props="defaultProps"
        @check="checkHandler"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog('perm')">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="menuPermSave"
          >保存</el-button
        >
      </div>
    </el-dialog>
    <!-- 所属单位 -->
    <el-dialog
      title="隶属于项目"
      :visible.sync="unitAccessshow"
      width="30%"
      @click="closeDialog('unit')"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
// 导入请求方法
import {
  // userList,
  // userSave,
  // userDelete,
  userPwd,
  // userExpireToken,
  // userFlashCache,
  userLock,
  UserDeptTree,
  UserDeptSave,
  UserDeptdeptTree,
  appGetDataByQzjQzjCompany,
  SaveDataBySysRoleFP01
  // UserChangeDept
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: "添加用户",
      url: "../../assets/img/lb@3x.png",
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑与添加
      editForm: {
        userId: "",
        nickname: "",
        xmno: "",
        usertype: "",
        pwd: "",
        userEmail: ""
      },
      // 部门参数
      // unitparm: {
      //   userIds: '',
      //   deptId: '',
      //   deptName: ''
      // },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        xmno: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        usertype: [{ required: true, message: "请选择权限", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userEmail: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      // 删除用户
      seletedata: {
        ids: "",
        token: sessionStorage.getItem("logintoken")
      },
      // 重置密码
      resetpsd: {
        userId: "",
        token: sessionStorage.getItem("logintoken")
      },
      // 用户下线
      offline: {
        token: sessionStorage.getItem("logintoken")
      },
      // 请求数据参数
      formInline: {
        page: 0,
        limit: 10,
        deptId: "",
        nickname: "",
        pwd: "",
        isLock: ""
      },
      //用户数据
      userData: [],
      // 数据权限
      UserDept: '',
      defaultProps: {
        children: "children",
        label: "title"
      },
      // 选中
      checkmenu: [],
      //参数role
      saveusertype: "",
      // 分页参数
      pageparm: {
        currentPage: 0,
        pageSize: 10,
        total: 10
      },
      row:{},
      values: "",
      optionss: [
        {
          value: "系统管理员",
          label: "系统管理员"
        },
        {
          value: "项目管理员",
          label: "项目管理员"
        },
        {
          value: "公司管理员",
          label: "公司管理员"
        }
      ],
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
      dataid: "",
      datalist: [],
      data: [],
      description: [],
      arrid: []
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
    this.UserDeptdeptTreewsl();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    traverseArrs(val) {
      var list = [];
      val.forEach((item, index) => {
        if (item.st == 1) {
          console.log(item.id);
          // list = item
          list.push(item.id);
          this.traverseArrs(item.children);
        } else {
          // this.data.splice(index, 1);
          console.log("item");
        }
      });
      return list;
    },
    imgclick(row) {
      this.unitAccessshow = true;

      console.log(row);
    },
    //树文件勾选事件
    checkHandler(...item) {
      console.log(item);
      var b = [];
      let a = item[1].checkedKeys;
      // let b = item[1].checkedNodes.map((a) => a.permissionToken);
      if (item[1].halfCheckedKeys[0]) {
        b.push(item[1].halfCheckedKeys[0]);
        a.forEach(item => {
          b.push(item);
        });
      } else {
        b = a;
      }
      console.log(b);
      // this.questionForm.description = a;
      this.description = b;
    },
    getCheckedKeys(e) {
      console.log(e);
    },
    UserDeptdeptTreewsl() {
      UserDeptdeptTree({}).then(res => {
        this.loading = false;
        if (res.code == 0) {
          console.log(res);
          this.datalist = res.list;
        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    // 获取数据方法
    getdata(parameter) {
      this.loading = true;
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // 获取用户列表
      var data = {
        keyowrd: this.name,
        PageIndex: parameter.page,
        PageSize: parameter.limit
      };
      userPwd(data).then(res => {
        this.loading = false;
        if (res.code == 0) {
          console.log(res);
          this.userData = res.data.list;
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
    //搜索事件
    search() {
      this.getdata(this.formInline);
    },
    // 修改type
    editType: function(index, row) {
      this.loading = true;
      let parm = {
        lock: "",
        userId: "",
        token: sessionStorage.getItem("logintoken")
      };
      parm.userId = row.userId;
      let lock = row.isLock;
      if (lock == "N") {
        parm.lock = "Y";
      } else {
        parm.lock = "N";
      }
      // 修改状态
      userLock(parm).then(res => {
        this.loading = false;
        if (res.success == false) {
          this.$message({
            type: "info",
            message: res.msg
          });
        } else {
          this.$message({
            type: "success",
            message: "状态修改成功"
          });
          this.getdata(this.formInline);
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        console.log(row);
        this.title = "修改用户";
        this.dataid = row.ID;
        this.editForm.userId = row.userId;
        this.editForm.nickname = row.nickname;
        this.editForm.xmno = row.xmno;
        this.editForm.usertype = row.usertype;
        this.editForm.pwd = row.pwd;
      } else {
        this.title = "添加用户";
        this.editForm.userId = "";
        this.editForm.nickname = "";
        this.editForm.xmno = "";
        this.editForm.usertype = "";
        this.editForm.pwd = "";
        this.editForm.userEmail = "";
      }
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      var time = new Date();
      if (this.editForm.pwd == this.editForm.userEmail) {
        this.$refs[editData].validate(valid => {
          if (valid) {
            // 请求方法
            var obj = {
              nickname: this.editForm.nickname,
              xmno: this.editForm.xmno,
              usertype: this.editForm.usertype,
              pwd: this.editForm.pwd,
              Created: time
            };
            var data = {
              jsonform: JSON.stringify(obj)
            };
            if (this.title == "添加用户") {
              console.log(data);
              userLock(data)
                .then(res => {
                  this.editFormVisible = false;
                  this.loading = false;
                  if (res.code == 0) {
                    this.getdata(this.formInline);
                    this.$message({
                      type: "success",
                      message: "数据保存成功！"
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
                  this.$message.error("保存失败，请稍后再试！");
                });
            } else if (this.title == "修改用户") {
              data.dataid = this.dataid;
              UserDeptTree(data)
                .then(res => {
                  this.editFormVisible = false;
                  this.loading = false;
                  if (res.code == 0) {
                    this.getdata(this.formInline);
                    this.$message({
                      type: "success",
                      message: "数据保存成功！"
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
                  this.$message.error("保存失败，请稍后再试！");
                });
            }
          } else {
            return false;
          }
        });
      } else {
        this.$message.error("密码不一致，请重新输入！");
      }
    },

    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == "edit") {
        this.editFormVisible = false;
      } else if (dialog == "perm") {
        this.dataAccessshow = false;
      } else if (dialog == "unit") {
        this.unitAccessshow = false;
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除
          UserDeptSave({ dataid: row.ID })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "数据已删除!"
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
              this.$message.error("数据删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
    },

    // 数据权限
    dataAccess(index, row) {
      this.row = row
      this.dataAccessshow = true;
      this.saveusertype = row.userId;
      appGetDataByQzjQzjCompany({userid:row.ID,isAll:1}).then(res => {
        this.loading = false;
        if (res.code == 0) {
          if (res.msg.length > 0) {
          this.arrid[0] = res.msg
          this.$nextTick(() => {
　　this.$refs.tree.setCheckedKeys([res.msg]);//获取已经设置的资源后渲染
});
          }else{
 this.$nextTick(() => {
　　this.$refs.tree.setCheckedKeys([res.msg]);//获取已经设置的资源后渲染
});
            this.arrid = res.msg.slice(',');
          }
          console.log(this.arrid);

        } else {
          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    traverseArr(obj, val) {
      let list = [];
      val.forEach(item => {
        if (item.id == obj) {
          list.push({
            userid: this.row.ID,
            type: item.tp,
            novalue: item.id
          });
          console.log(item);
          var data = {
            jsonform: {
              jsonData: list
            }
          };
          data = JSON.stringify(data.jsonform);
          console.log(data);
          SaveDataBySysRoleFP01({ jsonform: data }).then(res => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.dataAccessshow = false;
            }
            console.log(res);
          });
        } else {
          this.traverseArr(obj, item.children);
          console.log("item");
        }
      });
      // return list
    },
    // 菜单权限-保存
    menuPermSave() {
      for (let i = 0; i < this.description.length; i++) {
        this.traverseArr(this.description[i], this.datalist);
        console.log();
      }
    }
  }
};
</script>

<style scoped>
.margin_tb {
  margin: 20px 0;
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
  margin-top: 20px;
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
