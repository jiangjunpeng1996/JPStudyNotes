<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<template>
  <div class="box">
    <img src="../../assets/images/404.png" alt="" />
    <button @click="goHome">首页</button>
  </div>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  img {
    width: 800px;
    height: 400px;
  }
  button {
    width: 50px;
    height: 50px;
  }
}
</style>
