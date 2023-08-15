<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
import type { UserResponseData, Records, User } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
// 默认页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
// 用户总个数
let total = ref<number>(0)
// 存储全部用户数据
let userArr = ref<Records>([])
// 定义响应式数据控制抽屉的展示与隐藏
let drawer = ref<boolean>(false)
// 收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 组件挂载完毕
onMounted(() => {
  getHasUser()
})
const getHasUser = async (pager = 1) => {
  // 收集当前页码
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
// 分页器下拉菜单的自定义事件的回调
const handler = () => {
  getHasUser()
}
// 添加用户按钮
const addUser = () => {
  // 显示抽屉组件
  drawer.value = true
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
}
// 更新已有的用户按钮的回调
const updateUser = (row: User) => {
  // 显示抽屉组件
  drawer.value = true
}
// 确定按钮时间回调
const save = async () => {
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    // 关闭抽屉组件
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    // 获取最新的全部账号的信息
    getHasUser()
  } else {
    // 关闭抽屉组件
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}

// 取消按钮的回调
const cancel = () => {
  // 关闭抽屉组件
  drawer.value = false
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入搜索用户名"></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button type="danger" size="default">批量删除</el-button>
    <el-table style="margin: 10px 0" border :data="userArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" width="280px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User">
            分配角色
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getHasUser"
      @size-change="handler"
    />
  </el-card>
  <!-- 抽屉组件：完成添加新的用户账号|更新已有的账号信息 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            placeholder="请输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
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
