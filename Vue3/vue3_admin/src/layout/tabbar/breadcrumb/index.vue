<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting'
// 获取layout配置相关仓库
let layoutSettingStore = useLayoutSettingStore()
// 点击图标的方法
const changeIcon = () => {
  // 图标切换
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
