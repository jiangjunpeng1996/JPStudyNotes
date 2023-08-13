<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSalAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
// 子组件点击取消按钮：通知父组件切换场景为0，展示已有的SPU的数据
const cancel = () => {
  $emit('changeScene', 0)
}
// 存储已有的SPU这些数据
let allTrademark = ref<Trademark[]>([])
// SPU对应的商品图片
let imgList = ref<SpuImg[]>([])
// 已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
// 全部的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 存储已有的SPU对象
let spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 存储预览图片地址
let dialogImageUrl = ref<string>('')
// 存储还未选择的销售属性ID与属性值的名称
let saleAttrIdAndValueName = ref<string>('')

// 子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU对象，将来在模板中展示
  spuParams.value = spu
  // spu：即为副组件传递过来的已有的SPU对象
  // 获取全部品牌的数据
  const result: AllTradeMark = await reqAllTradeMark()
  // 获取某一个品牌旗下全部售卖商品的图片
  const result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  )
  const result3: HasSaleAttrResponseData = await reqAllSalAttr()
  // 存储全部品牌的数据
  allTrademark.value = result.data
  // SPU对应的商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 存储已有的SPU的销售属性
  saleAttr.value = result2.data
  // 存储全部的销售属性
  allSaleAttr.value = result3.data
}

// 照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  // 对话框显示
  dialogVisible.value = true
}
// 照片墙删除文件的钩子
const handleRemove = () => {}
// 照片墙上传文件成功之前的钩子，可以约束上传文件的类型与大小
const handleUpload = (file: any) => {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPEG|JPG|GIF',
    })
    return false
  }
}

// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  // 全部的销售属性
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})

// 添加销售属性的方法
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 准备一个新的销售属性对象
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  // 清空收集到数据
  saleAttrIdAndValueName.value = ''
}

// 属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
  // 点击按钮的时候，显示input组件
  row.flag = true
  row.saleAttrValue = ''
}
// 表单元素失去焦点的事件回调
const toLook = (row: SaleAttr) => {
  // 整理收集的属性ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  // 整理成服务器需要的属性值的形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 非法情况判断
  if (saleAttrValue?.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }
  // 追加新的属性值的对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}
// 保存按钮点击回调
const save = async () => {
  // 整理参数
  // 1. 整理照片墙的数据
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 2. 整理销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value
  // 发请求：添加SPU ｜ 更新已有的SPU
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    // 通知父组件切换场景为0
    $emit('changeScene', 0)
  } else {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}
// 对外暴露
defineExpose({ initHasSpuData })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <!-- -model:file-list 展示默认图片
        action: 上传图片的接口地址
        list-type：文件列表的类型
        on-preview：点击文件列表中已上传的文件时的钩子
        on-remove：文件列表移除文件时的钩子
        before-upload：上传文件之前的钩子
      -->
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt=""
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '暂无数据可选择'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!saleAttrIdAndValueName"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-1"
              closable
              style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值"
              size="small"
              style="width: 100px"
              v-model="row.saleAttrValue"
              @blur="toLook(row)"
            ></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="saleAttr.length <= 0"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
