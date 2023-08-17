<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import type { RoleResponseData, Records } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
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
    <el-button type="primary" size="default" icon="Plus">添加职位</el-button>
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
          <el-button type="primary" size="small" icon="User">
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
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
