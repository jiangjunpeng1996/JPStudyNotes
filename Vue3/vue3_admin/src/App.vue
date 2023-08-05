<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'

// 当组建挂在完毕时测试发一个请求
onMounted(() => {
  request({
    url: '/user/login',
    method: 'POST',
    data: {
      username: 'admin',
      password: '123456',
    },
  }).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<style lang="scss">
h1 {
  color: $color;
}
</style>
