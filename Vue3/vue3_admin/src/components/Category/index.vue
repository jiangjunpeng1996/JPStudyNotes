<script lang="ts" setup>
// 引入组件挂载完毕的钩子函数
import { onMounted } from 'vue'
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
// 分类全局组件挂载完毕，通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1()
})
// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}
// 一级分类下拉菜单的change事件（选中值的时候会触发，保证一级分类ID有了）
const handler = () => {
  // 需要将二级和三级的分类数据清除掉
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 通知仓库获取二级分类的数据
  categoryStore.getC2()
}
//  二级分类下拉菜单的change事件（选中值的时候会触发，保证二级分类ID有了）
const handler1 = () => {
  // 清除三级分类的数据
  categoryStore.c3Id = ''
  // 通知仓库获取三级分类的数据
  categoryStore.getC3()
}

// 接收父组件传递过来的props
defineProps(['scene'])
</script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene === 1"
        >
          <!-- label：即为展示数据标签 value：即为select下拉菜单收集的数据 -->
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene === 1"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene === 1">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
