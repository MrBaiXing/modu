/** * 订单管理 交易订单 */
<template>
  <div>
    <!-- 面包屑导航 9888624af8f41bd02b4a7b08cc7d842e-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监控数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <div class="handle-box">
      <div class="display">
        <div>
          <span>项目名称</span>
          <el-select v-model="value1" size="mini" placeholder="请选择">
    <el-option
      v-for="item in options1"
      
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
 <div>
          <span>设备编号</span>

          <el-select v-model="value2" size="mini" placeholder="请选择">
    <el-option
      v-for="item in options2"
      
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        

      </div>
    </div>
    <div class="display margin_tb">
        <div class="block">
    <span class="demonstration">起止时间</span>
    <el-date-picker
    size="mini"
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
      <div>

        <el-button type="primary" size="mini" @click="search">查询</el-button>

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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="devno"
        label="设备编号"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="devname"
        label="设备名称"
        width="70"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="devtype"
        label="设备类型"
        width="70"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="payType"
        label="所在区域"
        width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.provice }}-{{ scope.row.city }}-{{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column
        prop="devaddress"
        label="具体地址"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="coordinate"
        label="坐标信息"
        width="160"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="company"
        label="品牌"
        width="60"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="devxinghao"
        label="型号"
        width="60"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="devicedate"
        label="年检时间"
        width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="Created"
        label="添加时间"
        width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div>{{ scope.row.Created }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
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
    <el-dialog title="获取坐标" :visible.sync="dialogVisible" width="61%">
      <amap @listenToMap="showMapInformation" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
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
      <el-form-item label="公司编号">
          <el-select v-model="gsvalue" placeholder="请选择">
            <el-option
              v-for="item in gsoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号" prop="devno">
          <el-input
            v-model="ruleForm.devno"
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="devname">
          <el-input
            v-model="ruleForm.devname"
            placeholder="请输入设备名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="devtype">
          <el-select v-model="values" placeholder="请选择">
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="所在区域">
          <el-cascader
            size="large"
            :options="optionss"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item> -->
        <el-form-item label="具体地址" prop="devaddress">
          <el-input
            v-model="ruleForm.devaddress"
            placeholder="请输入具体地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="坐标信息" prop="coordinate">
          <div style="display: flex">
            <el-input
              v-model="ruleForm.coordinate"
              :disabled="true"
              placeholder="请输入坐标信息"
              style=" margin-right: 20px"
            ></el-input>
            <el-button type="primary" @click="IPxinxi">获取坐标信息</el-button>
          </div>
        </el-form-item>
        <el-form-item label="品牌" prop="company">
          <el-input
            v-model="ruleForm.company"
            placeholder="请输入品牌"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="devxinghao">
          <el-input
            v-model="ruleForm.devxinghao"
            placeholder="请输入型号"
          ></el-input>
        </el-form-item>
        <el-form-item label="年检时间" prop="company">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteUser('ruleForm')" size="mini"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=9888624af8f41bd02b4a7b08cc7d842e&plugin=AMap.Geocoder"
></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
import {
  OrderList,
  OrderRefund,
  OrderDelete,
  editOrderlist,
  Qzjlist
} from "../../api/payMG";
import Pagination from "../../components/Pagination";
import { regionData } from "element-china-area-data";
import amap from "../../components/amap.vue";
export default {
  data() {
    return {
      // optionss: regionData,
      // selectedOptions: [],
      values: "",
       value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: '',
         options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: '',
         options3: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value3: '',
         options4: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value4: '',
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
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "新增",
      ruleForm: {
        devno: "",
        devname: "",
        devaddress: "",
        // devtype: "",
        date1: "",
        coordinate: "",
        company: null,
        devxinghao: ""
      },
      rules: {
        devno: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
        devname: [
          { required: true, message: "请输入设备名称", trigger: "blur" }
        ],
        // devtype: [
        //   { required: true, message: "请输入设备类型", trigger: "blur" }
        // ],
        devaddress: [
          { required: true, message: "请输入所属区域", trigger: "blur" }
        ],
        coordinate: [
          { required: true, message: "请输入坐标信息", trigger: "blur" }
        ],
        company: [{ required: true, message: "请输入品牌", trigger: "blur" }],
        devxinghao: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
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
      editForm: {
        id: "",
        name: "",
        payType: 1,
        partner: "",
        subMchId: "",
        appid: "",
        notifyUrl: "",
        signType: "",
        partnerKey: "",
        sellerUserId: "",
        certPath: "",
        certPassword: "",
        rsaKey: ""
        // token: sessionStorage.getItem('logintoken')
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
      // 删除部门
      seletedata: {
        ids: "",
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
      shengshiqu: [],
      dataid: "",
      dialogVisible: false,
      zuobiao: "",
      gsoptions:[],
      gsvalue:''
    };
  },
  // 注册组件
  components: {
    Pagination,
    amap
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.Qzjlistwsl();
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    cancel() {
      this.dialogVisible = false;
    },
    confirm() {
      this.dialogVisible = false;
      this.ruleForm.coordinate = this.zuobiao;
    },
    showMapInformation(data) {
      console.log("地图位置数据" + JSON.stringify(data));
      console.log(data);
      this.zuobiao = data.lng + "," + data.lat;
      console.log("地图位置数据" + JSON.stringify(data.lng));
    },
    IPzuobiao() {},
    IPxinxi() {
      this.dialogVisible = true;
      console.log(123);
    },
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
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
      OrderList(data)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.listData = res.data.list;
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page;
            this.pageparm.pageSize = this.formInline.limit;
            this.pageparm.total = res.data.total;
            this.listData.forEach(item=>{
              if (item.Created) {
                item.Created = item.Created.slice(0, 10)
                
              }
              if (item.devicedate) {
                item.devicedate = item.devicedate.slice(0, 10)
                }
                
            })
            console.log(this.listData);
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
      console.log(parm.currentPage);
      this.pageparm.currentPage = parm.currentPage;
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
        this.gsvalue = row.gsno
        this.values = row.devtype
        this.dataid = row.ID;
        this.title = "编辑";
        this.ruleForm.date1 = new Date(row.devicedate)
      } else {
        this.title = "新增";
        this.ruleForm = {};
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
      this.$refs[editData].validate(valid => {
        if (valid) {
          var time = new Date()
          var arr = {
            devno: this.ruleForm.devno,
            devname: this.ruleForm.devname,
            devtype: this.values,
            devaddress: this.ruleForm.devaddress,
            company: this.ruleForm.company,
            devxinghao: this.ruleForm.devxinghao,
            coordinate: this.zuobiao,
            gsno: this.gsvalue,
            devicedate: this.formatDate(this.ruleForm.date1),
            Created:this.formatDate(time)
          };
          var data = {
            jsonform: JSON.stringify(arr)
          };
          if (this.title == "新增") {
            OrderRefund(data)
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
          } else if (this.title == "编辑") {
            data.dataid = this.dataid
            console.log(data);
           editOrderlist(data)
              .then(res => {
                this.editFormVisible = false;
                this.loading = false;
                if (res.code == 0) {
                  this.getdata(this.formInline);
                  this.$message({
                    type: "success",
                    message: "设备保存成功！"
                  });
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              })
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
          OrderDelete({ dataid: row.ID })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
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
    closeDialog(formName) {
      this.editFormVisible = false;
      this.$refs[formName].resetFields();
    },
    Qzjlistwsl() {
      Qzjlist({keyowrd: ""}).then(res => {
        if (res.code == 0) {
          res.list.forEach(item=>{
            this.gsoptions.push({value:item.gsno,label:item.gsno})
          })
          console.log(this.gsoptions);
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
