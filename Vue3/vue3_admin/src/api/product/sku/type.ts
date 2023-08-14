export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义SKU对象的ts类型
export interface Attr {
  id?: number
  attrId: number | string
  valueId: number | string
}

export interface saleAttr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id?: string | number //三级分类的ID
  spuId?: string | number //已有的SPU的ID
  tmId?: string | number //SPU品牌的ID
  skuName?: string //sku名字
  price?: string | number //sku价格
  weight?: string | number //sku重量
  skuDesc?: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  skuDefaultImg?: string //sku图片地址
  isSale?: number // 控制商品的上架与下架
  id?: number
}

// 获取SKU接口返回的ts数据类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 获取SKU商品详情数据ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
