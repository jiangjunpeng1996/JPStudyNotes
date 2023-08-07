<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
let userStore = useUserStore()
// 获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 获取路由对象
const $route = useRoute()
// 定义变量控制按钮加载效果
let loading = ref(false)
// 收集账号与密码的数据
let loginForm = reactive({
  username: 'admin',
  password: '123456',
})
// 登录按钮回调
const login = async () => {
  // 保证全部表单项校验通过才去发请求
  await loginForms.value.validate()
  // 加载效果：开始加载
  loading.value = true
  // 点击登录按钮以后要干什么？
  // 通知仓库发登录请求
  // 请求成功->跳转首页展示数据的地方
  // 请求失败->弹出登录失败信息
  try {
    // 保证登录成功
    await userStore.userLogin(loginForm)
    // 编程式导航跳转到展示数据首页
    // 判断登录的时候，路由的路径当中是否有query参数，如果有，就往query参数的路由去跳，没有就跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    // 登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI，${getTime()}好`,
    })
    // 登录成功，加载效果也消失
    loading.value = false
  } catch (error) {
    // 登录失败，加载效果消失
    loading.value = false
    // 登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule：即为校验规则对象
  // value：即为表单元素文本内容
  // 函数：如果符合条件，callback放行通过即可，如果不符合条件，callback方法注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}

// 定义表单校验需要的配置对象
const rules = {
  // 规则对象属性：
  // required：代表这个字段务必要校验的
  // min：文本长度至少多少位
  // max：文本长度最多多少位
  // message：错误的提示信息
  // trigger：触发表单校验的时机，change->文本发生变化时触发校验，blur->失去焦点的时候出发校验规则
  username: [
    // {
    //   required: true,
    //   message: '用户名不能为空',
    //   trigger: 'blur',
    // },
    // {
    //   required: true,
    //   min: 5,
    //   max: 10,
    //   message: '账号长度至少5位，最多10位',
    //   trigger: 'change',
    // },
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: '密码长度应在6～15位之间',
    //   trigger: 'change',
    // },
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: 100% 100%;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
