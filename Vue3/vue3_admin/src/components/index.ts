// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
// 全局组件对象
const allGlobalComponent = {
  SvgIcon,
}
// 对外暴露插件对象
export default {
  // 务必叫做install方法
  install(app) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
