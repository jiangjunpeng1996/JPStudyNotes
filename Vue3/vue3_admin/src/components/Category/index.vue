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
</script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id">
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
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="上海"></el-option>
          <el-option label="广州"></el-option>
          <el-option label="深圳"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="上海"></el-option>
          <el-option label="广州"></el-option>
          <el-option label="深圳"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
