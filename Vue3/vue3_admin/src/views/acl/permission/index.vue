<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqAllPermission } from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
} from '@/api/acl/menu/type'
// 存储菜单和按钮的数据
let permissionArr = ref<PermissionList>([])
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
        <el-button type="primary" size="small" :disabled="row.level === 4">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="primary" size="small" :disabled="row.level === 1">
          编辑
        </el-button>
        <el-button type="danger" size="small" :disabled="row.level === 1">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
