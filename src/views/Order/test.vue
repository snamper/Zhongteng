<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in cartList"
      :key="item.value"
      :label="item.carName"
      :value="item.carName">
    </el-option>
  </el-select>
</template>

<script>
import { cartModel } from "@/api";
export default {
  data() {
    return {
      value: "",
      cartList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { page, pageSize } = this;
      this.$axios
        .post(cartModel.query, { carName: this.searchValue })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.cartList = this.paging(page, pageSize, data.data);
            this.totalArr = data.data;
            this.type = "";
            console.log(res);
          } else {
            this.$message(data.msg);
          }
        });
    },
    handleEdit(index, row) {
      this.selectData = { ...row };
      this.type = "编辑";
      this.isShow = true;
    },
    //修改内容
    update(value) {
      this.$axios.post(cartModel.addOrUpdate, { ...value }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.getData();
        } else {
          this.$message(data.msg);
        }
      });
    },
    //查询内容
    queryClick() {
      this.getData();
    },
    delete(arr) {
      this.$axios
        .post(cartModel.delete, { carTypeIds: arr })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.$message.success("删除成功");
            this.getData();
          } else {
            this.$message(data.msg);
          }
        })
        .catch((e) => {
          this.$message(e);
        });
    },
    //删除内容
    handleDelete(index, row) {
      let tem = [{ typeId: row.typeId }];
      //   console.log(tem)
      this.delete(tem);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deletesHandle() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择数据");
        return false;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = JSON.parse(JSON.stringify(this.multipleSelection));
        let arr = [];
        params.forEach((element) => {
          arr.push({ typeId: element.typeId });
        });
        this.delete(arr);
      });
      //   this.handleDelete()
    },
    //增加
    addCart() {
      this.type = "新增";
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value);
      this.$axios.post(cartModel.addOrUpdate, { ...value }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.$message.success("添加成功成功");
          this.isShow = false;
          this.getData();
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
};
</script>