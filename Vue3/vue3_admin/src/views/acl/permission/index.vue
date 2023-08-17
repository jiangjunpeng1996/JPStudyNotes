<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { reqAllPermission, reqAddOrUpdateMenu } from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
  Permission,
  MenuParams,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus';
// 存储菜单和按钮的数据
let permissionArr = ref<PermissionList>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 添加与更新菜单携带的参数
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
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
  // 清空数据
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 显示对话框
  dialogVisible.value = true
  // 收集新增的菜单的level数值
  menuData.level = row.level + 1
  // 给哪个菜单新增子菜单
  menuData.pid = row.id as number
}

// 编辑已有的菜单按钮的回调
const updatePermission = (row: Permission) => {
  // 显示对话框
  dialogVisible.value = true
  Object.assign(menuData, row)
}

// 确定按钮的回调
const save = async () => {
  // 新增子菜单或更新已有菜单的请求
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code === 200) {
    // 对话框隐藏
    dialogVisible.value = false
    // 提示信息
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    getHasPermission()
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
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
  >
    <el-form>
      <el-form-item label="名称">
        <el-input
          placeholder="请输入菜单的名称"
          v-model="menuData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input
          placeholder="请输入权限数值"
          v-model="menuData.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
