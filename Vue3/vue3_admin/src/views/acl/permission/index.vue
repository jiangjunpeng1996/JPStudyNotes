<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqAllPermission } from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
  Permission,
} from '@/api/acl/menu/type'
// 存储菜单和按钮的数据
let permissionArr = ref<PermissionList>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 组件挂载完毕
onMounted(() => {
  getHasPermission()
})

// 获取菜单数据的方法
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}

// 添加菜单按钮的回调
const addPermission = (row: Permission) => {
  // 显示对话框
  dialogVisible.value = true
}

// 编辑已有的菜单按钮的回调
const updatePermission = (row: Permission) => {
  // 显示对话框
  dialogVisible.value = true
}
</script>

<template>
  <el-table border row-key="id" :data="permissionArr">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column
      label="修改时间"
      prop="updateTime"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="操作" width="260px">
      <template #="{ row, $index }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.level === 4"
          @click="addPermission(row)"
        >
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="row.level === 1"
          @click="updatePermission(row)"
        >
          编辑
        </el-button>
        <el-button type="danger" size="small" :disabled="row.level === 1">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框组件：添加菜单或者更新已有的菜单的数据结构 -->
  <el-dialog v-model="dialogVisible" title="添加菜单">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入菜单的名称"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请输入权限数值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
