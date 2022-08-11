/** * 基础菜单 商品管理 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <div><el-button
      type="primary"
      size="mini"
      style="margin-top:20px"
      @click="handleEdit()"
      >添加</el-button
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
    
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="isshow" label="是否展开">
        <template slot-scope="scope">
          <el-switch
  v-model="scope.row.isshow"
  disabled>
</el-switch>
        </template>
         </el-table-column>
      <el-table-column prop="isexpand" label="是否显示"> 
                <template slot-scope="scope">
          <el-switch
  v-model="scope.row.isexpand"
  disabled>
</el-switch>
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination> -->
    <!-- 编辑界面 -->
    <el-dialog
      :title="title"
      :visible.sync="editFormVisible"
      width="30%"
      @click="closeDialog"
    >
      <el-form
        label-width="120px"
        :model="editForm"
        :rules="rules"
        ref="editForm"
      >
        <el-form-item label="上级目录">
          <el-popover
            v-model="popoverVisible"
            placement="bottom"
            width="200"
            trigger="click"
          >
            <!-- click:点击select时弹出框显示 -->
            <!-- popover+tree用于选择，树形控件放在弹出框中 -->
            <el-tree
              :data="tableData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
            <!-- select展示选择结果，储存选择值typeValue -->
            <el-select
              slot="reference"
              v-model="typeValue"
              placeholder="请选择"
              popper-class="hiddenSel"
              size="mini"
            >
              <el-option
                v-for="item in tableData"
                size="mini"
                :key="item.id"
                :label="item.title"
                :value="item.title"
              />
            </el-select>
          </el-popover>
        </el-form-item>
        <el-form-item label="导航名称" prop="deptName">
          <el-input
            size="small"
            v-model="editForm.deptName"
            auto-complete="off"
            placeholder="请输入导航名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="URL地址" prop="deptNo">
          <el-input
            size="small"
            v-model="editForm.deptNo"
            auto-complete="off"
            placeholder="请输入URL地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="paixu">
          <el-input
            size="small"
            v-model="editForm.paixu"
            auto-complete="off"
            placeholder="请输入排序"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否展开" prop="value">
          <el-switch
            v-model="editForm.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否显示" prop="values">
          <el-switch
            v-model="editForm.values"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
import { menu, editmenu, addmenu, delectmenu } from "../../api/userMG";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        deptId: "",
        deptName: "",
        value: false,
        values: false,
        deptNo: "",
        paixu: "",
        token: sessionStorage.getItem("logintoken")
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: "请输入导航名称", trigger: "blur" }
        ],
        deptNo: [{ required: true, message: "请输入URL地址", trigger: "blur" }],
        paixu: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      formInline: {
        page: 1,
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
      tableData: [],
      popoverVisible: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
      typeValue: "请选择",
      editid: 0,
      editPid: 0,
      editids: 0,
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
      value:''
    };
  },
  // 注册组件

  /**
   * 数据发生改变
   */
  mounted() {},
  /**
   * 创建完毕
   */
  created() {
    this.getdata();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    handleNodeClick(data) {
      // 若父级不可选，则在此处判断
      // if (data.id === 0 || data.id === 6) {
      //   return
      // }
      // 点击树形控件选择后，隐藏弹出框
      this.popoverVisible = false;
      // 将点击的tree值赋值给select（select中即展示）
      console.log(data.id, data.pid);
      this.typeValue = data.title;
      this.editPid = data.pid;
      this.editid = data.id;
    },
    // 获取公司列表
    getdata() {
      this.loading = true;
      menu({ keyowrd: "" })
        .then(res => {
          this.loading = false;
          console.log(res);
          if (res.code == 0) {
            this.tableData = res.list;
          } else {
            // this.tableData = res.list
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("菜单加载失败，请稍后再试！");
        });
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },
    traverseArr(obj, pid) {
        let list = ''
      obj.forEach(item => {
        console.log(item,pid);
        if (item.id != pid) {
          console.log(item);
        //   this.traverseArr(item);

          item.children.forEach(items => {
            console.log(items);

            if (items.id == pid) {
            list = item.title

              console.log(items.title,item.pid);
            } else {
              this.traverseArr(items);
            }
          });
        } else {
            list = item.title
            console.log(item);
        //   this.traverseArr(item);
        }
      });
    return list
      // if(obj){
      // this.idList.push(obj.id)

      // this.typeValue = tableData[index].pid;

      // }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        this.title = "编辑";
        this.editids = row.id;
        this.editForm.value = row.isexpand == 'True'?true:false;
        this.editForm.values = row.isshow == 'True'?true:false;
        this.editForm.deptName = row.title;
        this.editForm.deptNo = row.url;
        this.editForm.paixu = row.disno;
        this.typeValue = this.traverseArr(this.tableData, row.pid);
        this.editPid = row.pid;
      } else {
        this.title = "添加";
        this.editForm.deptId = "";
        this.editForm.deptName = "";
        this.editForm.deptNo = "";
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          console.log(this.title);

          var object = {
            title: this.editForm.deptName,
            weburl: this.editForm.deptNo,
            disno: this.editForm.paixu,
            isshow: this.editForm.values,
            isexpand: this.editForm.value,
            isUse: 1
          };
          if (this.title == "编辑") {
            object.PID = this.editid|| this.editPid;

            console.log(object);
            var data = {
              jsonform: JSON.stringify(object),
              dataid: this.editids
            };
            console.log(data);
            editmenu(data)
              .then(res => {
                console.log(res);
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata();
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
              .catch(err => {
                this.editFormVisible = false;
                this.loading = false;
                this.$message.error("公司保存失败，请稍后再试！");
              });
          } else if (this.title == "添加") {
            object.PID = this.editid;
            var data = {
              jsonform: JSON.stringify(object)
            };
            console.log(data);
            addmenu(data)
              .then(res => {
                console.log(res);
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata();
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
    handleDelete(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (row.children.length == 0) {
            delectmenu({ dataid: row.id })
              .then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.msg
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
                this.$message.error("删除失败，请稍后再试！");
              });
          } else {
            this.$message.error("当前导航下有子页面,不能删除!");
          }
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
.display {
  display: flex;
  justify-content: space-between;
}
.two_switch {
  border: 1px solid #f00;
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 20px;
}
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>
