<script lang="ts" setup>
import { ref } from 'vue'
import type {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSalAttr,
} from '@/api/product/spu'
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
// 子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
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
  imgList.value = result1.data
  // 存储已有的SPU的销售属性
  saleAttr.value = result2.data
  // 存储全部的销售属性
  allSaleAttr.value = result3.data
}
// 对外暴露
defineExpose({ initHasSpuData })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="小米"></el-option>
        <el-option label="苹果"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action=""
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="小米"></el-option>
        <el-option label="苹果"></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加属性值
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
