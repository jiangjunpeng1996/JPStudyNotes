<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from './api/user'

// 当组建挂在完毕时测试发一个请求
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '123456',
  })
})
</script>

<template>
  <div>
    <h1>App根组件</h1>
  </div>
</template>

<style lang="scss">
h1 {
  color: $color;
}
</style>
