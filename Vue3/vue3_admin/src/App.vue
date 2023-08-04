<script setup lang="ts">
// 引入图标组件
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
console.log(import.meta.env)
</script>

<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">Primary</el-button>
    <el-button type="success" size="default" :icon="Edit">Edit</el-button>
    <el-button type="danger" size="default" :icon="Delete">Delete</el-button>
    <el-pagination
      :total="400"
      :page-size="100"
      :page-sizes="[10, 25, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<style lang="scss">
</style>
