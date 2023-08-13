<script lang="ts" setup>
import { ref, watch } from 'vue'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'
// 引入分类的仓库
import useCategoryStore from '@/store/modules/category';
// 引入相应的子组件
import SpuFrom from './spuForm.vue'
import SkuFrom from './skuForm.vue'
let categoryStore = useCategoryStore()
// 场景的数据
let scene = ref<number>(0) // 0 显示已有SPU 1 添加或修改SPU 2 添加SKU
// 分页器默认页码
let pageNo = ref<number>(1)
// 每一页展示几条数据
let pageSize = ref<number>(3)
// 存储已有的SPU的数据
let records = ref<Records>([])
// 存储已有SPU总个数
let total = ref<number>(0)
// 获取子组件实例SpuForm
let spu = ref<any>()
// 监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
// 获取某一个三级分类下全部已有的SPU
const getHasSpu = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager
  const result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

// 分页器的下拉菜单发生变化的时候触发
const changeSize = () => {
  getHasSpu()
}

// 添加新的SPU的按钮点击的回调
const addSpu = () => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 点击添加SPU按钮，调用子组件的方法初始化数据
  spu.value.initAddSpu(categoryStore.c3Id)
}

// 子组件SpuForm绑定自定义事件：目的是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  // 子组件SpuForm点击取消，变为场景0，展示已有的SPU数据
  scene.value = obj.flag
  if (obj.params === 'update') {
    // 更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    // 添加留在第一页
    getHasSpu()
  }
}

// 修改已有的SPU的按钮点击回调
const updateSpu = (row: SpuData) => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 调用子组件实例的方法，获取已有的SPU的数据
  spu.value.initHasSpuData(row)
}

// 添加SKU按钮的回调
const addSku = () => {
  scene.value = 2
}
</script>

<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <!-- v-if|v-show都可以实现显示与隐藏 -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <!-- 展示已有的SPU数据 -->
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <!-- row：即为已有的SPU对象 -->
            <template #="{ row, $index }">
              <el-button
                type="primary"
                title="添加SKU"
                size="small"
                icon="Plus"
                @click="addSku"
              ></el-button>
              <el-button
                type="primary"
                title="修改SPU"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                title="查看SKU列表"
                size="small"
                icon="View"
              ></el-button>

              <el-button
                type="primary"
                title="删除SPU"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加SPU｜修改SPU子组件 -->
      <SpuFrom
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuFrom>
      <!-- 添加SKU的子组件 -->
      <SkuFrom v-show="scene === 2" @changeScene="changeScene"></SkuFrom>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
