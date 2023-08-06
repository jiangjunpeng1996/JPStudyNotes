<script lang="ts" setup>
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
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
        <el-menu background-color="#001529" text-color="#fff">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">2</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <p style="height: 100000px; background: red">我是一个段落</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_sidebar {
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
    background: cyan;
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
