<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input
            v-model="searchValue"
            placeholder="请输入车牌号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            @click="queryClick"
          >查询</el-button>
        </el-col>

      </el-row>
      <el-button
        type="primary"
        @click="addCart"
      >增加</el-button>
      <el-button
        type="danger"
        @click="deletesHandle"
      >批量删除</el-button>

      <download-excel
        class="export-excel-wrapper"
        :data="cartList"
        :fields="json_fields"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button
          type="primary"
          size="small"
        >导出EXCEL</el-button>
      </download-excel>

    </div>
    <el-table
      :data="cartList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="vin"
        label="生产厂家"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="engine"
        label="产品编码"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="busbegdate"
        label="产品名称"
        width="200"
      >

        <template slot-scope="scope">
          {{scope.row.busbegdate|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="busenddate"
        label="不含税单价"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.busenddate|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="trabegdate"
        label="含税单价"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.trabegdate|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="traenddate"
        label="单位"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.traenddate|formatDate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
      >
      </el-table-column>

      <el-table-column
        prop="health"
        label="备注"
        width="500"
      >
        <template slot-scope="scope">

          <el-input
            type="textarea"
            disabled
            v-model="scope.row.remarks"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <!-- <el-popconfirm title="是否删除此条数据?">
           
          </el-popconfirm> -->
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm='handleDelete(scope.$index, scope.row)'
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="cartList.length"
      background
    >
    </el-pagination>
    <update-cart
      :isShow='isShow'
      :selectData='selectData'
      :update="update"
      :type='type'
    ></update-cart>
  </div>
</template>

<script>
import { cartApi } from '@/api'
import updateCart from '@/components/UpdateCart'

export default {
  data() {
    return {
      cartList: [],
      pagesize: 9,//每页的数据条数
      currentPage: 1,//默认开始页面
      isShow: false,
      selectData: {},
      searchValue: '',
      multipleSelection: [],
      type: '',
      json_fields: {
        '车辆id': 'carid',
        车架号: 'vin',
        车型: 'engine',
        车牌号: 'carnumber',
        商保开始日: 'busbegdate',
        商保到期日: 'busenddate',

        交强开始日: 'trabegdate',
        交强到期日: 'traenddate',
        年检时间: 'motdate',
        注册日期: 'registerdate',
        交付日期: 'paydate',
        租期: 'leasedate',
        状态: 'status',
        保养: 'health',
        备注: 'remarks',
        发票: 'bill',
        计数: 'number',
        客户代码: 'customerid',
        厂家代码: 'fid',
      },


    }
  },
  components: {
    updateCart
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post(cartApi.querCart, { vin: this.searchValue }).then(res => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartList = data.data
          this.type = ''

        } else {
          this.$message(data.msg)
        }
      })
    },
    handleEdit(index, row) {

      this.selectData = { ...row };
      this.type = '编辑'
      this.isShow = true;
    },
    //修改内容
    update(value) {

      this.$axios.post(cartApi.updateCarInfo, { ...value }).then(res => {
        const data = res.data;
        if (data.errCode == 200) {
          this.getData()
        } else {
          this.$message(data.msg)
        }
      })

    },
    //查询内容
    queryClick() {
      if (this.searchValue == '') {
        this.getData();
      } else {
        this.getData();
      }
    },
    //删除内容
    handleDelete(index, row) {
      this.multipleSelection.push(row);
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          this.$axios.post(cartApi.deleteCartInfo, { vin: item.vin }).then(res => {
            const data = res.data;
            if (data.errCode == 200) {
              this.$message.success('删除成功')
              this.getData()
            } else {
              this.$message(data.msg)
            }
          }).catch(e => {
            this.$message(e)
          })
        })

      }

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deletesHandle() {
      this.handleDelete()
    },
    //增加
    addCart() {
      this.type = '增加'
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value)
      this.$axios.post(cartApi.insertCarInfo, { ...value }).then(res => {
        const data = res.data;
        if (data.errCode == 200) {
          this.$message.success('添加成功成功')
          this.isShow = false;
          this.getData()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.params {
  display: flex;
  margin-bottom: 15px;
  .el-row {
    display: inline-block;
    margin-right: 15px;
  }
  .export-excel-wrapper {
    margin-left: 15px;
    .el-button {
      height: 100%;
    }
  }
}
</style>