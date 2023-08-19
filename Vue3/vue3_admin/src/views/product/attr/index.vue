<script lang="ts" setup>
// 组合式API函数watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// 引入获取已有属性与属性值接口方法
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
// 定义card组件内容切换变量
// scene: 0 显示table 1 展示添加与修改结构
let scene = ref<number>(0)
// 定义一个响应式数据，用于控制编辑模式与查看模式的切换
let flag = ref<boolean>(true)
// 准备一个数组，将来存储对应的组件实例el-input
let inputArr = ref<any>([])
// 收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', // 新增的属性的名字
  attrValueList: [], // 新增的属性值数组
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, // 代表的是三级分类
})
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

// 添加属性按钮的回调
const addAttr = () => {
  // 每一次点击的时候，先清空一下数据，再收集数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  // 切换为添加与修改属性的结构
  scene.value = 1
}
// table表格修改已有属性按钮的回调
const updateAttr = (row: Attr) => {
  // 切换为添加与修改属性的结构
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象即可
  // 这里必须要用深拷贝方法JSON.parse(JSON.stringify())
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值按钮点击回调
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    // 控制每一个属性值的编辑模式与查看模式的切换
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存按钮的回调
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    // 添加属性或者修改已有的属性已经成功
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 获取全部已有的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// 属性值表单元素失去焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况的判断
  if (row.valueName.trim() === '') {
    // 删除掉对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 非法情况二：属性值名称相同
  const repeat = attrParams.attrValueList.find((item) => {
    // 切记把当前失去焦点的属性值对象从当前数组剔除
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    // 将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  // 相应的属性值对象的flag变为false，展示div
  row.flag = false
}

// 属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  // 相应的属性值对象的flag变为true，展示el-input
  row.flag = true
  // nextTick：响应式数据发生变化，获取更新的DOM（组件实例）
  nextTick(() => {
    console.log(inputArr.value[$index])
    inputArr.value[$index].focus()
  })
}

// 删除某一个已有属性方法回调
const deleteAttr = async (attrId: number) => {
  // 发送相应的删除已有的属性请求
  const result: any = await reqRemoveAttr(attrId)
  if (result.code === 200) {
    // 删除成功
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取一次已有的属性与属性值
    getAttr()
  } else {
    // 删除失败
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  // 清空分类仓库的所有数据
  categoryStore.$reset()
})
</script>

<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
          v-has="`btn.Attr.add`"
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
              <!-- 修改已有属性的按钮 -->
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
                v-has="`btn.Attr.update`"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}这个属性吗?`"
                width="250px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    v-has="`btn.Attr.remove`"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 展示添加属性与修改属性的结构 -->
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row: 即为当前的属性值对象 -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                v-if="row.flag"
                size="small"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="save"
          :disabled="!attrParams.attrValueList.length"

        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
