<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let settingStore = useLayoutSettingStore()
// 当前的页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(10)
// 职位的总个数
let total = ref<number>(0)
// 搜索职位的关键字
let keyword = ref<string>('')
// 存储全部已有的职位
let allRole = ref<Records>([])
// 控制添加职位与更新已有职位对话框的显示隐藏
let dialogVisible = ref<boolean>(false)
// 收集新增职位数据
let roleParams = reactive<RoleData>({
  roleName: '',
})
// 获取添加职位form组件实例
let form = ref<any>()
// 控制抽屉显示与隐藏
let drawer = ref<boolean>(false)
// 定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
// 组件挂载完毕
onMounted(() => {
  // 获取全部职位的请求
  getHasRole()
})
// 全部全部用户信息的方法|分页器当前页码发生变化的回调
const getHasRole = async (pager = 1) => {
  // 修改当前的页码
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
// 分页器下拉菜单的回调
const sizeChange = async () => {
  getHasRole()
}
// 搜索按钮的回调
const search = () => {
  // 根据搜索关键字发送请求
  getHasRole()
  // 清空搜索关键字
  keyword.value = ''
}
// 重置按钮的回调
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加职位按钮的回调
const addRole = () => {
  // 显示对话框组件
  dialogVisible.value = true
  // 清空数据
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  // 清空上一次表单校验错误信息
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
// 更新已有职位按钮的回调
const updateRole = (row: RoleData) => {
  // 显示对话框组件
  dialogVisible.value = true
  // 存储已有的职位数据
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

// 自定义校验规则的回调
const validateRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
// 职位名称校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }],
}

// 确定按钮的回调
const save = async () => {
  // 表单校验结果，结果通过再发请求
  await form.value.validate()
  // 添加职位|更新已有职位的请求
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    // 提示信息
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    // 关闭对话框
    dialogVisible.value = false
    // 再次获取全部职位
    getHasRole(roleParams.id ? pageNo.value : 1)
  }
}

// 分配权限按钮的回调
const setPermission = async (row: RoleData) => {
  // 显示抽屉组件
  drawer.value = true
  // 收集当前要分配权限的职位的数据
  Object.assign(roleParams, row)
  // 根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(roleParams.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input
          placeholder="请输入搜索职位的关键字"
          v-model="keyword"
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button
          type="primary"
          size="default"
          :disabled="!keyword"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">
      添加职位
    </el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column
        align="center"
        label="职位名称"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="260px">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setPermission(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper , ->, sizes, total, "
      :total="total"
      @current-change="getHasRole"
      @size-change="sizeChange"
    />
  </el-card>
  <!-- 添加职位已更新已有的职位对话框组件 -->
  <el-dialog
    v-model="dialogVisible"
    :title="roleParams.id ? '更新职位' : '添加职位'"
  >
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          placeholder="请你输入职位名称"
          v-model="roleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件：分配职位的菜单权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[2, 3]"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .form_item {
    margin-right: unset;
  }
}
</style>
