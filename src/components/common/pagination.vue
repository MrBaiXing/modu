<template>
  <div class="box">
      <span class="span">共{{pageparmObj.table}}条</span>
    <el-select v-model="value" placeholder="请选择" size="mini" style="width:100px;margin: 3px 0 0 10px" @change="handleSizeChange">
    <el-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      
    >
    </el-option>
  </el-select>
    <el-pageparm
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageparmObj.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageparmObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageparmObj.table"
    >
    </el-pageparm>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  props: ["pageparm"],
  setup(props, context) {
      console.log(props.pageparm);
      const pageparmObj = computed(()=>{
          return props.pageparm
      })
    return {
      pageparmObj
    };
  },
  data() {
      return {
          options: [{
          value: '10',
          label: '10条'
        }, {
          value: '20',
          label: '20条'
        }, {
          value: '30',
          label: '30条'
        }, {
          value: '40',
          label: '40条'
        }, {
          value: '50',
          label: '50条'
        }],
        value: '10'
      }
  },
  methods: {
    handleSizeChange(val) {
        console.log(val);
        console.log(`每页 ${val} 条`);
       this.$parent.pageparmcli(val,'val')

    },
    handleCurrentChange(val) {
        console.log(this.pageparmObj);
       this.$parent.pageparmcli(val-1,'inx')
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style>
.span{
    font-size: 14px;
    line-height: 30px;
}
.box{
    display: flex;
}
</style>
