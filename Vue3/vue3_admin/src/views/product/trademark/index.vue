<script lang="ts" setup>
// 引入组合式API函数ref
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqHasTradeMark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每一个展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<Records>([])
// 定义手机新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 获取el-form组件实例
let formRef = ref()
// 获取已有品牌的接口封装为一个函数，在任何情况下获取数据，调用此函数即可
const getHasTrademark = async (pager: number = 1) => {
  pageNo.value = pager
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

// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
// const changePageNo = () => {
//   // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//   getHasTrademark()
// }

// 当下拉菜单发生变化时会触发此方法
// 这个自定义事件，分页器组件会将下拉菜单选中的数据返回
const sizeChange = () => {
  // 当前每一页的数据发生变化的时候，当前的页码归1
  getHasTrademark()
}

// 添加品牌按钮点击回调
const addTrademark = () => {
  dialogFormVisible.value = true
  // 清空收集的数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 第一种写法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')

  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 修改品牌按钮点击回调
const updateTrademark = (row: TradeMark) => {
  // 情况校验规则错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  // 对话框显示
  dialogFormVisible.value = true
  // 展示已有品牌的数据，ES6合并对象
  Object.assign(trademarkParams, row)
}

// 对话框底部取消按钮点击回调
const cancel = () => {
  dialogFormVisible.value = false
}

// 对话框底部确定按钮点击回调
const confirm = async () => {
  // 在发请求之前，要对整个表单进行校验
  // 调用这个方法进行全部的表单项进行校验
  await formRef.value.validate()
  const result: any = await reqAddOrUpdateTrademark(trademarkParams)
  // 添加/修改品牌成功
  if (result.code === 200) {
    // 关闭对话框
    dialogFormVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 再次发请求获取已有的全部品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    // 关闭对话框
    dialogFormVisible.value = false
  }
}

// 上传图片组件-上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 这个钩子是在图片上传成功之前触发，上传文件之前可以约束文件的类型与大小
  // 要求：上传文件格式png|jpg|jpeg|gif
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpg' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件类型必须是PNG|JPG|JPEG|GIF',
    })
    return false
  }
}

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response: 即为当前这次上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data
  // 图片上传成功，清除掉对应图片的错误提示信息
  formRef.value.clearValidate('logoUrl')
}

// 品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callback: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    // 校验未通过返回的错误信息
    callback(new Error('品牌名称位数大于等于两位'))
  }
}

// 品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  // 如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('LOGO的图片务必上传'))
  }
}

// 表单校验规则对象
const rules = {
  tmName: [
    // required：这个字段务必校验，表单项前面出现五角星
    // trigger: 表单项触发校验规则时机['blur', 'change']
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
}

// 气泡确认框确认按钮点击回调
const removeTradeMark = async (id: number) => {
  // 点击确定按钮，发送删除已有品牌的请求
  let result: any = await reqDeleteTrademark(id)
  if (result.code === 200) {
    // 删除成功提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
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
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定删除${row.tmName}这个品牌吗？`"
              width="300px"
              icon="delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
        @current-change="getHasTrademark"
        @size-change="sizeChange"
      />
    </el-card>

    <!-- 对话框组件：在添加品牌与修改已有品牌的业务时使用 -->
    <!-- v-model：属性用于控制对话框的显示与隐藏的 true 显示 false 隐藏 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- el-upload属性：
            action: 图片上传的服务器地址
            show-file-list：是否显示已上传文件列表
            before-upload: 上传图片之前触发的钩子函数，可以约束文件的类型与大小
            on-success：图片上传成功的钩子
           -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
              style="width: 100px; height: 100px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
