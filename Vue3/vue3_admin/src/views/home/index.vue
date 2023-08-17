<script setup lang="ts">
import { getTime } from '@/utils/time';
// 引入用户相关的仓库获取用户的头像及昵称
import useUserStore from '@/store/modules/user'
// 获取存储用户信息的仓库对象
let userStore = useUserStore()
</script>

<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="footer">
        <h3 class="title">
          {{ getTime() }}好~
          <span>{{ userStore.username }}</span>
        </h3>
        <p class="subtitle">后台管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<style lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .footer {
    margin-left: 20px;
    margin-top: 15px;
    .title {
      font-size: 35px;
      margin-bottom: 30px;
      font-weight: 900;
    }
    .subtitle {
      font-style: italic;
      color: #ccc;
      font-weight: 700;
    }
  }
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
