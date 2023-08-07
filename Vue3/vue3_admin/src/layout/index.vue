<script lang="ts" setup>
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 右侧内容展示区域
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 获取路由对象
const $route = useRoute()
</script>

<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_sidebar">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <!-- 根据路由动态生成菜单 -->
        <el-menu
          background-color="#001529"
          text-color="#fff"
          active-text-color="yellowgreen"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_sidebar {
    color: #fff;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: unset;
      }
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellowgreen;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
  }
}
</style>
