<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchValue" placeholder="请输入服务站名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>

      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesHandle">批量删除</el-button>

      <download-excel class="export-excel-wrapper" :data="cartList" :fields="json_fields">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>

    </div>
    <el-table :data="cartList" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="serviceId" label="服务站编码" width="180">
      </el-table-column>
      <el-table-column prop="sName" label="服务站名称" width="150">
      </el-table-column>
      <el-table-column prop="sProvince" label="服务站所在省" width="150">

      </el-table-column>
      <el-table-column prop="sCity" label="服务站所在市" width="200">

      </el-table-column>
      <el-table-column prop="sAddress" label="服务站详细地址" width="200">

      </el-table-column>
      <el-table-column prop="sPerson" label="服务站联系人">
      </el-table-column>
      <el-table-column prop="sDepartment" label="联系人部门">
      </el-table-column>
      <el-table-column prop="sPhone" label="联系方式">
      </el-table-column>
      <el-table-column prop="operator" label="操作人">
      </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="200">
        <template slot-scope="scope">
          {{scope.row.operatorDate|formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？" @confirm='handleDelete(scope.$index, scope.row)'>
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination layout="prev, pager, next" :total="cartList.length" background>
    </el-pagination>
    <UpdateService :isShow='isShow' :datas='selectData' :update="update" :type='type'></UpdateService>
  </div>
</template>

<script>
import { services } from '@/api'
import UpdateService from './update/UpdateService'

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
        服务站编码: 'serviceId',
        服务站名称: 'sName',
        服务站所在省: 'sProvince',
        服务站所在市: 'sCity',
        联系人部门: 'sDepartment',
        联系方式: 'sPhone',


        操作人: 'operator',
        操作时间: 'operatorDate',



      },


    }
  },
  components: {
    UpdateService
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post(services.query, { sName: this.searchValue }).then(res => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartList = this.paging(this.page, this.pageSize, data.data)
          this.totalArr = data.data;
          this.type = ''

        } else {
          this.$message(data.msg)
        }
      })
    },
    handleEdit(index, row) {

      this.selectData = { ...row };
      console.log(this.selectData)
      this.type = '编辑'
      this.isShow = true;
    },
    //修改内容
    update() {



    },
    //查询内容
    queryClick() {
      if (this.searchValue == '') {
        this.getData();
      } else {
        this.getData();
      }
    },
    delete(params) {

      if (this.multipleSelection.length > 0) {

        this.$axios.post(services.delete, { factoryId: params }).then(res => {
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


      }

    },
    //删除内容
    handleDelete() {
      //   this.multipleSelection.push(row);
      //   if (this.multipleSelection.length > 0) {
      //     this.multipleSelection.forEach(item => {
      //       this.$axios.post(cartApi.deleteCartInfo, { vin: item.vin }).then(res => {
      //         const data = res.data;
      //         if (data.errCode == 200) {
      //           this.$message.success('删除成功')
      //           this.getData()
      //         } else {
      //           this.$message(data.msg)
      //         }
      //       }).catch(e => {
      //         this.$message(e)
      //       })
      //     })

      //   }

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deletesHandle() {
      this.handleDelete()
    },
    //增加
    addCart() {
      this.type = '新增'
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value)

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