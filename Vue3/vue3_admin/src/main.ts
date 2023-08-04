import { createApp } from 'vue'
import App from '@/App.vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化

// 忽略当前文件ts类型的检测，否则有红色提示（打包会失败）
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})

// svg插件需要配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
// 安装自定义插件
app.use(globalComponent)

// 引入模板的全局样式
import '@/styles/index.scss'

// 测试代码：测试mock接口能否使用
import axios from 'axios'
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '123456',
  },
})

// 将应用挂载到挂载点上
app.mount('#app')
