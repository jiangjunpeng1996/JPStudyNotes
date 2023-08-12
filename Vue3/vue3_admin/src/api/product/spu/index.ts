// SPU管理模块相关的接口
import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
} from './type'

enum API {
  // 获取已有的SPU的数据
  HAS_SPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPU_HAS_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一个新的SPU
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HAS_SPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

// 获取全部的SPU的品牌的数据
export const reqAllTradeMark = () => {
  return request.get<any, AllTradeMark>(API.ALL_TRADEMARK_URL)
}

// 获取某个SPU下的全部的售卖商品的图片地址
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

// 获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(
    API.SPU_HAS_SALE_ATTR_URL + spuId,
  )
}

// 获取全部的销售属性
export const reqAllSalAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)
}

// 添加或修改已有的SPU接口
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    return request.post<any, any>(API.ADD_SPU_URL, data)
  }
}
