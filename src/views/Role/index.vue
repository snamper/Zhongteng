<template>
  <div class="role">
    <el-table
      :data="roleList"
      stripe
      style="width: 100%"
      border
    >
      <el-table-column
        prop="name"
        label="角色"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="角色编辑"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        label-width="80px"
        :model="ruleForm"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="ruleForm.roleName"
            size="small"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[5]"
        :default-checked-keys="[5]"
        ref="tree"
        highlight-current
      >
      </el-tree>
      <div
        slot="footer"
        class="dialog-footer"
      >

        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sureClick"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatterRouter } from '@/utils'
let roleList = [
  {
    name: '平台管理员',
  },
  {
    name: '企业管理员',
  },
  {
    name: '操作员',
  },
]

export default {
  data() {
    return {
      roleList,
      dialogVisible: false,
      innerVisible: false,
      ruleForm: {
        roleName: ''
      },
      treeData: [],
      checkedRouter: [5],
    }
  },
  created() {
    let routerArr = this.$router.options.routes.filter(item => !item.hidden);
    console.log(routerArr)
    this.treeData = formatterRouter(routerArr)
    console.log(formatterRouter(routerArr))
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.roleName = row.name
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    sureClick() {
      this.dialogVisible = false
      this.innerVisible = false;
      console.log(this.$refs.tree.getCheckedNodes());
      this.$notify({
        title: '成功',
        message: '用户权限修改成功',
        type: 'success'
      });
    },

  }
}
</script>

<style>
</style>