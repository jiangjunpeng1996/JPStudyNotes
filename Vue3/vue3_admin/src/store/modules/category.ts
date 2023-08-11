// 商品分类全局组件的小仓库
import { defineStore } from "pinia"
import { reqC1 } from "@/api/product/attr"
const useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      // 存储一级分类的数据
      c1Arr: [],
      // 存储一级分类的ID
      c1Id: '',
    }
  },
  actions: {
    // 获取一级分类的方法
    async getC1() {
      // 发请求获取一级分类的数据
      const result: any = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
  },
})

export default useCategoryStore
