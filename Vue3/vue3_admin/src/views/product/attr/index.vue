<script lang="ts" setup>
// 组合式API函数watch
import { watch, ref } from 'vue'
// 引入获取已有属性与属性值接口方法
import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性与属性值
    attrArr.value = []
    // 保证三级分类id存在才能发送请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

// 获取已有的属性与属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  // 获取分类下的已有的属性与属性值
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
</script>

<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category />
    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
