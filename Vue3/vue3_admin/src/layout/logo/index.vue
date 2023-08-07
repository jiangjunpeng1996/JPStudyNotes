<script lang="ts" setup>
// 引入设置标题与logo的配置文件
import setting from '@/setting'
</script>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
