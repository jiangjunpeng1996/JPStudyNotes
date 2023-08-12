// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  tmId: number | string
  description: string
  category3Id: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImg[]
}

// 数组：元素都是已有SPU的ts数据类型
export type Records = SpuData[]

// 定义获取已有的SPU接口返回的ts数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 品牌数据的ts数据类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

// 品牌接口返回的数据的ts数据类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

// 商品图片的ts类型
export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}

// 已有的SPU的照片墙数据的ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

// 已有的销售属性对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

// 存储已有的的销售属性值数组ts类型
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
}

// SPU已有的销售属性接口返回的数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 已有的全部SPU的销售属性数据ts类型
export interface HasSaleAttr {
  id: number
  name: string
}

// 已有的全部SPU的返回数据ts类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
