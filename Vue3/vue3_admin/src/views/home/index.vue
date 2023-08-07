<script setup lang="ts">
// 引入组合式API函数之生命周期函数
import { onMounted } from 'vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 首页挂载完毕时，发送请求获取用户相关信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<template>
  <div>
    <h1>home</h1>
  </div>
</template>

<style lang="scss"></style>
