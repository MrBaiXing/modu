/** * 分页组件 */
<template>
  <el-pagination
    class="page-box"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="curr"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="childMsg.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="childMsg.total"
  >
  </el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props: ["childMsg"],
  data() {
    return {
      pageparm: {
        currentPage: this.childMsg.currentPage,
        pageSize: this.childMsg.pageSize
      },
      curr : this.childMsg.currentPage
    };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.pageparm.pageSize = val;
      console.log(val);
      this.$emit("callFather", this.pageparm);
    },
    handleCurrentChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.curr = val
      this.pageparm.currentPage = val - 1;
      console.log(this.pageparm.currentPage);
      this.$emit("callFather", this.pageparm);
    }
  }
};
</script>

<style>
.page-box {
  margin: 10px auto;
}
</style>
