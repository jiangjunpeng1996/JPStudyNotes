// 商品分类全局组件的小仓库
import { defineStore } from "pinia"
import { reqC1 } from "@/api/product/attr"
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from "./types/type"
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
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
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
  },
})

export default useCategoryStore
