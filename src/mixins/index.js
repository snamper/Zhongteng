export const pagination = {
  data: function() {
    return {
      pageSize: 15, //每页的数据条数
      page: 1,
      totalArr: [],
    }
  },
  methods: {
    //分页
    paging(page, pageSize, array) {
      var offset = (page - 1) * pageSize
      console.log(offset, pageSize)
      if (pageSize >= array.length) {
        return array
      }
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize)
    },
    handleCurrentChange(val) {
      this.cartList = this.paging(val, this.pageSize, this.totalArr)
    },
  },
}
