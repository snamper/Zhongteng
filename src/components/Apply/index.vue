<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchValue" placeholder="请输入车架号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesHandle">批量删除</el-button>

      <download-excel class="export-excel-wrapper" :data="cartList" :fields="json_fields">
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </div>
    <el-table :data="cartList" style="width: 100%" height="700px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="applicationId" label="维修申请单号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="vin" label="车架号" width="180"> </el-table-column>
      <el-table-column prop="category" label="维修类别" width="150">
      </el-table-column>
      <el-table-column prop="troublePic" label="故障图片" width="200" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.invoice" style="width: 30px; height: 30px" :preview-src-list="scope.row.invoice"></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="workHours" label="预估工时" width="200">
      </el-table-column>

      <el-table-column prop="laborCost" label="预估人工费" width="200">
      </el-table-column>

      <el-table-column prop="productId11" label="配件编码1" width="200">
      </el-table-column>
      <el-table-column prop="productId12" label="配件编码2" width="200">
      </el-table-column>
      <el-table-column prop="productId12" label="配件编码3" width="200">
      </el-table-column>

      <el-table-column prop="product1" label="配件1"> </el-table-column>
      <el-table-column prop="product2" label="配件2"> </el-table-column>
      <el-table-column prop="product3" label="配件3"> </el-table-column>
      <el-table-column prop="carId" label="车辆编码" align="center" width="200">
      </el-table-column>
      <el-table-column prop="vin" label="车架号" width="200"> </el-table-column>

      <el-table-column prop="customerId" label="客户编码"> </el-table-column>
      <el-table-column prop="ctName" label="客户名称"> </el-table-column>
      <el-table-column prop="serviceId" label="服务站编码" width="200">
      </el-table-column>
      <el-table-column prop="cName" label="服务站名称" width="200">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="200">
        <template slot-scope="scope">
          <el-input type="text" disabled v-model="scope.row.remarks"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="userId" label="申请人"> </el-table-column>
      <el-table-column prop="operatorDate" label="申请时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-popconfirm title="是否删除此条数据?">
           
          </el-popconfirm> -->
          <el-popconfirm confirm-button-text="好的" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1">
    </el-pagination>
    <UpdateApplication :isShow="isShow" :datas="selectData" :update="update" :type="type"></UpdateApplication>
  </div>
</template>

<script>
import { applyInfo } from '@/api'
import UpdateApplication from '@/views/Repair/update/UpdateApplication'

export default {
  data() {
    return {
      cartList: [],

      isShow: false,
      selectData: {},
      searchValue: '',
      multipleSelection: [],

      type: '',
      json_fields: {
        维修申请单号: 'applicationId',
        车架号: 'vin',
        维修类别: 'category',
        预估工时: 'workHours',
        预估人工费: 'laborCost',
        配件编码1: 'productId11',

        配件编码2: 'productId12',
        配件1: 'product1',
        配件2: 'product2',
        配件3: 'product3',
        车辆编码: 'carId',
        客户编码: 'customerId',
        客户名称: 'ctName',
        服务站编码: 'serviceId',
        服务站名称: 'cName',
        申请人: 'userId',
        申请时间: 'appTime',
      },
      carId: [],
    }
  },
  components: {
    UpdateApplication,
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const { page, pageSize } = this
      this.$axios
        .post(applyInfo.query, { vin: this.searchValue })
        .then((res) => {
          const data = res.data
          if (data.errCode == 200) {
            this.cartList = this.paging(page, pageSize, data.data)
            this.totalArr = data.data
            this.type = ''
          } else {
            this.$message(data.msg)
          }
        })
    },
    handleEdit(index, row) {
      this.selectData = { ...row }
      this.type = '编辑'
      this.isShow = true
    },
    //修改内容
    update(value) {
      this.$axios.post(applyInfo.addOrUpdate, { ...value }).then((res) => {
        const data = res.data
        if (data.errCode == 200) {
          this.getData()
        } else {
          this.$message(data.msg)
        }
      })
    },
    //查询内容
    queryClick() {
      this.getData()
    },
    delete(arr) {
      this.$axios
        .post(applyInfo.delete, { applicationIds: arr })
        .then((res) => {
          const data = res.data
          if (data.errCode == 200) {
            this.$message.success('删除成功')
            this.getData()
          } else {
            this.$message(data.msg)
          }
        })
        .catch((e) => {
          this.$message(e)
        })
    },
    //删除内容
    handleDelete(index, row) {
      let tem = [{ applicationId: row.applicationId }]
      //   console.log(tem)
      this.delete(tem)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deletesHandle() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择数据')
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let params = JSON.parse(JSON.stringify(this.multipleSelection))
        let arr = []
        params.forEach((element) => {
          arr.push({ applicationId: element.applicationId })
        })
        this.delete(arr)
      })
      //   this.handleDelete()
    },
    //增加
    addCart() {
      this.type = '新增'
      this.selectData = {}
      this.isShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
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
