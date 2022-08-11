/** * 基础菜单 机器信息管理 */
<template>
  <div>
    <!-- 面包屑导航 -->

    <div class="box">
      <div class="box_lefts">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin:30px 0 0 20px"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据字典</el-breadcrumb-item>
        </el-breadcrumb>
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
        <div style="margin:0 5px; width:100%">
          <el-table
            ref="multipleTable"
            
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            @row-click="click"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="dtname" label="字典名称" width="120">
            </el-table-column>
            <el-table-column
              prop="dtcode"
              label="字段名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
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
        </div>
        <Pagination
          v-bind:child-msg="pageparm"
          @callFather="callFather"
        ></Pagination>
      </div>
      <div class="box_rights">
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
        <div style="margin:0 5px;width:100%">
          <el-table
            ref="multipleTable"
            :data="tableDatas"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChanges"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="dtname" label="名称" width="100">
            </el-table-column>
            <el-table-column
              prop="dtcode"
              label="字段名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="disno" label="排序" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="170">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
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
        </div>
        <Pagination
          v-bind:child-msg="pageparms"
          @callFather="callFathers"
        ></Pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="editFormVisible"
      width="40%"
      @click="closeDialog('editForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="字典名称" prop="dtname">
          <el-input v-model="ruleForm.dtname"></el-input>
        </el-form-item>
        <el-form-item label="字段名称" prop="dtcode">
          <el-input v-model="ruleForm.dtcode"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog('ruleForm')" size="mini"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
     <el-dialog
      :title="title"
      :visible.sync="editFormVisibles"
      width="40%"
      @click="closeDialog('editForm')"
    >
      <el-form
        :model="ruleForms"
        :rules="ruless"
        ref="ruleForms"
        label-width="100px"
        class="demo-ruleForms"
      >
        <!-- <el-form-item label="名称" prop="dtname">
          <el-input v-model="ruleForms.dtname"></el-input>
        </el-form-item> -->
        <el-form-item label="字段名称" prop="dtname">
          <el-input v-model="ruleForms.dtname"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="disno">
          <el-input v-model="ruleForms.disno"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="ruleForms.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog('ruleForms')" size="mini"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForms('ruleForms')" size="mini"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ModuleList,
  ModuleGet,
  ModuleSave,
  ModuleDelete
} from "../../api/userMG";
import Pagination from "../../components/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      ruleForm: {
        dtname: "",
        dtcode: ""
      },
      rules: {
        dtname: [
          { required: true, message: "请输入字典名称", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dtcode: [
          { required: true, message: "请输入字段名称", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
       ruleForms: {
        dtname: "",
        // dtcode: "",
        beizhu:'',
        disno:''
      },
      ruless: {
        // dtname: [
        //   { required: true, message: "请输入字典名称", trigger: "blur" }
        //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        dtname: [
          { required: true, message: "请输入字段名称", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],beizhu: [
          { required: true, message: "请输入排序信息", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],disno: [
          { required: true, message: "请输入备注", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
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
      pageparm: {
        currentPage: 0,
        pageSize: 10,
        total: 10
      },
      pageparms: {
        currentPage: 0,
        pageSize: 10,
        total: 10
      },
      tableData: [],
      multipleSelection: [],
      tableDatas: [],
      multipleSelections: [],
      formInline: {
        page: 0,
        limit: 10,
        machineNo: "",
        orderNo: "",
        transId: "",
        payType: 0,
        orderStatus: 0
      },
      formInlines: {
        page: 0,
        limit: 10,
        machineNo: "",
        orderNo: "",
        transId: "",
        payType: 0,
        orderStatus: 0
      },
      title: "新增",
      editFormVisible: false,
      editFormVisibles: false,
      name: "",
      names: "",
      dataid: "",
      dtcode:''
    };
  },
  /**
   * 创建完毕
   */
  created() {
    // this.Qzjlistwsl();
    // this.getdatas(this.formInline, { dttype: "1", dtcode: "" });
    this.getdata(this.formInlines);
  },
  methods: {
    click(e) {
      console.log(e);
      this.dtcode = e.dtcode
      this.getdatas(this.formInline, e);
    },
    getdata(parameter) {
      var data = {
        keyowrd: this.name,
        PageIndex: parameter.page,
        PageSize: parameter.limit,
        dtcode: "",
        dttype: "1"
      };
      ModuleList(data).then(res => {
        this.loading = false;
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.list;
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
    getdatas(parameter, val) {
      var data = {
        keyowrd: this.names,
        PageIndex: parameter.page,
        PageSize: parameter.limit,
        dtcode: val.dtcode,
        dttype: '2'
      };
      ModuleList(data).then(res => {
        this.loading = false;
        console.log(res);
        if (res.code == 0) {
          this.tableDatas = res.data.list;
          // 分页赋值
          this.pageparms.currentPage = this.formInlines.page;
          this.pageparms.pageSize = this.formInlines.limit;
          this.pageparms.total = res.data.total;
        } else {
          this.tableDatas = [];

          this.$message({
            type: "info",
            message: res.msg
          });
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;

      if (row != undefined && row != "undefined") {
        console.log(row);
        this.ruleForm = row;
        this.dataid = row.ID;
        this.title = "编辑";
      } else {
        this.title = "新增";
        this.ruleForm = {};
      }
    },
        handleEdits: function(index, row) {
      this.editFormVisibles = true;

      if (row != undefined && row != "undefined") {
        console.log(row);
        this.ruleForm = row;
        this.dataid = row.ID;
        this.title = "编辑";
      } else {
        this.title = "新增";
        this.ruleForm = {};
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          var arr = {
            dtname: this.ruleForm.dtname,
            dtcode: this.ruleForm.dtcode,
            dttype:'1'
          };
          var data = {
            jsonform: JSON.stringify(arr)
          };
          if (this.title == "新增") {
            ModuleGet(data).then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.code == 0) {
                this.getdata(this.formInline);
                this.$message({
                  type: "success",
                  message: "保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          } else if (this.title == "编辑") {
            data.dataid = this.dataid;
            console.log(data);
            ModuleSave(data).then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.code == 0) {
                this.getdata(this.formInline);
                this.$message({
                  type: "success",
                  message: "保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    submitForms(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          var arr = {
            dtname: this.ruleForms.dtname,
            dtcode: this.dtcode,
            beizhu: this.ruleForms.beizhu,
            disno: this.ruleForms.disno*1,
            dttype:'2'
          };
          var data = {
            jsonform: JSON.stringify(arr)
          };
          if (this.title == "新增") {
            ModuleGet(data).then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.code == 0) {
                this.getdatas(this.formInline, {dtcode:this.dtcode});
                this.$message({
                  type: "success",
                  message: "保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          } else if (this.title == "编辑") {
            data.dataid = this.dataid;
            console.log(data);
            ModuleSave(data).then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.code == 0) {
                // this.getdata(this.formInline);
                this.getdatas(this.formInline, {dtcode:this.dtcode});

                this.$message({
                  type: "success",
                  message: "保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline)
    },
    callFathers(parm) {
      this.formInlines.page = parm.currentPage;
      this.formInlines.limit = parm.pageSize;
      this.getdatas(this.formInlines)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelections(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelections(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChanges(val) {
      this.multipleSelections = val;
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
          ModuleDelete({ dataid: row.ID })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "数据已删除!"
                });
                this.getdata(this.formInline);
                this.getdatas(this.formInline, {dtcode:this.dtcode});

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
        closeDialog(formName) {
      this.editFormVisible = false;
      this.editFormVisibles = false;
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style>
.box_lefts {
  width: 49%;
  background-color: #fff;
  margin-right: 20px;
}
.box_rights {
  background-color: #fff;

  width: 49%;
}
.box {
  display: flex;
}
.display {
  display: flex;
  justify-content: space-between;
}
.margin_tb {
  margin: 20px 10px;
}
body {
  /* background-color: #f1f1f1; */
}
</style>
