/** * 系统管理 公司管理 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
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
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="xmno" label="项目编号"> </el-table-column>
      <el-table-column prop="gsno" label="公司编号"> </el-table-column>
      <el-table-column prop="gsfullname" label="公司全称"> </el-table-column>
      <el-table-column label="所在区域" width="170">
        <template #default="scope">
          {{ scope.row.provice }}-{{ scope.row.city }}-{{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="具体地址"> </el-table-column>
      <el-table-column prop="fuzeren" label="负责人"> </el-table-column>
      <el-table-column prop="telphone" label="手机号"> </el-table-column>
      <el-table-column label="操作" width="170">
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
    <el-dialog
      :visible.sync="editFormVisible"
      @click="closeDialog"
      :title="title"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目编号">
          <el-select v-model="xmvalue" placeholder="请选择">
            <el-option
              v-for="item in xmoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司编号" prop="gsno">
          <el-input
            v-model="ruleForm.gsno"
            placeholder="请输入公司编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司全称" prop="gsfullname">
          <el-input
            v-model="ruleForm.gsfullname"
            placeholder="请输入公司全称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在区域">
          <el-cascader
            size="large"
            :options="optionss"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="具体地址" prop="address">
          <el-input
            v-model="ruleForm.address"
            placeholder="请输入具体地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="fuzeren">
          <el-input
            v-model="ruleForm.fuzeren"
            placeholder="请输入负责人"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telphone">
          <el-input
            v-model="ruleForm.telphone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog" size="mini">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  deptList,
  deptSave,
  depDelete,
  deptedit,
  deptFenye
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
import { regionData } from "element-china-area-data";
import { loginreq } from '../../api/axiosFun';
export default {
  data() {
    return {
      value: "",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        deptId: "",
        deptName: "",
        deptNo: ""
        // token: sessionStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        deptNo: [{ required: true, message: "请输入部门代码", trigger: "blur" }]
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
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      name: "",
      optionss: regionData,
      selectedOptions: [],
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
      ruleForm: {
        xmno: "",
        gsno: "",
        address: "",
        gsfullname: "",
        date1: "",
        fuzeren: "",
        telphone: null
      },
      rules: {
        xmno: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
        gsno: [{ required: true, message: "请输入公司编号", trigger: "blur" }],
        gsfullname: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入所属区域", trigger: "blur" }
        ],
        fuzeren: [{ required: true, message: "请输入负责人", trigger: "blur" }],
        telphone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请输入日期",
            trigger: "change"
          }
        ]
      },
      shengshiqu: [],
      xmoptions: [],
      xmvalue: ""
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
    this.deptFenyewsl();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    handleChange(value) {
      this.shengshiqu[0] = CodeToText[value[0]];
      this.shengshiqu[1] = CodeToText[value[1]];
      this.shengshiqu[2] = CodeToText[value[2]];
    },
    // 获取公司列表
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
      deptList(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
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
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        console.log(row);
        this.ruleForm = row;
        this.xmvalue  = row.xmno
        this.dataid = row.ID;
        this.title = "修改";
        this.selectedOptions[0] = row.provicevalue;
        this.selectedOptions[1] = row.cityvalue;
        this.selectedOptions[2] = row.areavalue;
      } else {
        this.title = "添加";
        this.ruleForm = {};
        this.selectedOptions = []
        this.xmvalue = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          var date = {
            xmno: this.xmvalue,
            gsno: this.ruleForm.gsno,
            address: this.ruleForm.address,
            Created: this.ruleForm.date1,
            gsfullname: this.ruleForm.gsfullname,
            fuzeren: this.ruleForm.fuzeren,
            telphone: this.ruleForm.telphone,
            provice: this.shengshiqu[0],
            city: this.shengshiqu[1],
            area: this.shengshiqu[2],
            provicevalue: this.selectedOptions[0],
            cityvalue: this.selectedOptions[1],
            areavalue: this.selectedOptions[2]
          };
          var data = {
            jsonform: JSON.stringify(date)
          };
          if (this.title == "添加") {
            deptSave(data)
              .then(res => {
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata(this.formInline);
                  this.$message({
                    type: "success",
                    message: "公司保存成功！"
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
                this.$message.error("公司保存失败，请稍后再试！");
              });
          } else if (this.title == "修改") {
            data.dataid = this.dataid;
            deptedit(data)
              .then(res => {
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata(this.formInline);
                  this.$message({
                    type: "success",
                    message: "公司保存成功！"
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
                this.$message.error("公司保存失败，请稍后再试！");
              });
          }
        } else {
          return false;
        }
      });
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          depDelete({ dataid: row.ID })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "公司已删除!"
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
              this.$message.error("公司删除失败，请稍后再试！");
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
      this.selectedOptions = []
    },
    deptFenyewsl() {
      deptFenye({ keyowrd: "" }).then(res => {
        if (res.code == 0) {
          res.list.forEach(item => {
            console.log(item);
            this.xmoptions.push({ value: item.xmno, label: item.proname });
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
