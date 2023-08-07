<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
// 获取layout配置相关仓库
let layoutSettingStore = useLayoutSettingStore()
// 点击图标的方法
const changeIcon = () => {
  // 图标切换
  layoutSettingStore.fold = !layoutSettingStore.fold
}
// 获取路由对象
let $route = useRoute()
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
    <!-- 动态展示路由名字与图标 -->
    <el-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon style="margin: 0 2px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
