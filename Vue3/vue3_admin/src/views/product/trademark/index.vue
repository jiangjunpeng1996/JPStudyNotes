<script lang="ts" setup>
// 引入组合式API函数ref
import { ref, onMounted } from 'vue'
import { reqHasTradeMark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
// 当前页码
let pageNo = ref<number>(1)
// 每一个展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<Records>([])
// 获取已有品牌的接口封装为一个函数，在任何情况下获取数据，调用此函数即可
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTradeMark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    // 存储已有品牌的总条数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 组件挂载完毕钩子，需要发一次请求，获取第一页数据
onMounted(() => {
  getHasTrademark()
})
</script>

<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的数据 -->
    <!-- table属性：
      border: 可以设置表格纵向是否有边框
      table-column属性：
        label：列的标题
        width：列的宽度
        align：列的对齐方式
     -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <!-- table-column：默认展示数据用div -->
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器组件
      属性：
        v-model:current-page：设置分页器当前页码
        v-model:page-size：设置每一个展示数据的条数
        page-sizes：用于设置下拉菜单每页显示数据的条数
        background：设置分页器按钮背景颜色
        layout：可以设置分页器六个子组件布局调整
     -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      :total="total"
      layout="prev, pager, next, jumper, ->, sizes, total"
    />
  </el-card>
</template>

<style scoped lang="scss"></style>
