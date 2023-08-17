<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
// 获取路由器对象
const $router = useRouter()
// 获取路由对象
const $route = useRoute()
// 刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
// 退出登录按钮点击回调
const logout = async () => {
  // 1：需要向服务器发请求[退出登录接口]
  // 2：仓库当中关于用户相关的数据需要清空[token | username | avatar]
  await userStore.userLogout()
  // 3：跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)
// switch开关的change事件进行暗黑模式的切换
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          show-alpha
          :predefine="predefineColors"
          size="small"
          v-model="color"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          v-model="dark"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
