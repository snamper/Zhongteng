// export const logion_url = '/api/v1/sys/demo/queryUserInfo'
export const logion_url = '/api/v1/sys/login'
export const cartApi = {
  querCart: '/api/v1/sys/demo/queryCarInfo',
  updateCarInfo: '/api/v1/sys/demo/updateCarInfo',
  deleteCartInfo: '/api/v1/sys/demo/deleteCarInfo',
  insertCarInfo: '/api/v1/sys/demo/insertCarInfo',
}

export const getMenu = {
  menuUrl: '/api/v1/sys',
  allMenu: '/api/v1/sys/menuTree',
}

//客户信息
export const customer = {
  queryCustomerList: '/api/v1/base/queryCustomerList',
  delete: '/api/v1/base/removeCustomerInfo',
  addInfo: '/api/v1/base/addOrUpdateCustomer',
}
//车辆管理
export const cart = {
  query: '/api/v1/base/queryCarInfo',
  addOrUpdate: '/api/v1/base/addOrUpdateCarInfo',
  delete: '/api/v1/base/removeCar',
}
//车型信息
export const cartModel = {
  query: '/api/v1/base/queryCarTypeInfo',
  addOrUpdate: '/api/v1/base/addOrUpdateCarTypeInfo',
  delete: '/api/v1/base/removeCarType',
}
//主机厂信息
export const factory = {
  query: '/api/v1/base/queryFactoryInfo',
  addOrUpdate: '/api/v1/base/addOrUpdateFactoryInfo',
  delete: '/api/v1/base/removeFactory',
}
//服务站信息
export const services = {
  query: '/api/v1/base/queryServicesInfo',
  addOrUpdate: '/api/v1/base/addOrUpdateServicesInfo',
  delete: '/api/v1/base/removeServices',
}
//保险信息
export const insurance = {
  query: '/api/v1/base/queryInsuranceList',
  addOrUpdate: '/api/v1/base/addOrUpdateInsurance',
  delete: '/api/v1/base/removeInsuranceInfo',
}

//申请信息
export const applyInfo = {
  query: '/api/v1/repair/queryApplicationList',
  addOrUpdate: '/api/v1/repair/addOrUpdateApplication',
  delete: '/api/v1/repair/removeApplicationInfo',
}
//维修审核
export const repairApi = {
  neiqin: {
    query: '/api/v1/repair/queryApplicationList1',
    update: '/api/v1/repair/addOrUpdateApplication',
  },
  //申请信息主管审核
  director: {
    query: '/api/v1/repair/queryApplicationList2',
    update: '/api/v1/repair/addOrUpdateApplication',
  },
  //申请信息总经理审核
  manager: {
    query: '/api/v1/repair/queryApplicationList3',
    update: '/api/v1/repair/addOrUpdateApplication',
  },
  //申请信息财务审核
  finance: {
    query: '/api/v1/repair/queryApplicationList4',
    update: '/api/v1/repair/addOrUpdateApplication',
  },
  //申请通过信息
  success: {
    query: '/api/v1/repair/queryApplicationSuccessList',
  },
  fail: {
    query: '/api/v1/repair/queryApplicationfailList',
  },
}

//回执信息
export const receipt = {
  query: '/api/v1/repair/queryReceiptList',
  addOrUpdate: '/api/v1/repair/addOrUpdateReceipt',
  delete: '/api/v1/repair/removeReceiptInfo',
}

//订单信息
export const order = {
  query: '/api/v1/order/queryCarOrderList',
  addOrUpdate: '/api/v1/order/addOrUpdateCarOrder',
  delete: '/api/v1/order/removeCarOrderInfo',
}

//配件信息
export const product = {
  query: '/api/v1/product/queryProductList',
  addOrUpdate: '/api/v1/product/addOrUpdateProduct',
  delete: '/api/v1/product/removeProductInfo',
}

//入库信息
export const instorage = {
  query: '/api/v1/product/queryInStorageList',
  addOrUpdate: '/api/v1/product/addOrUpdateInStorage',
  delete: '/api/v1/product/removeInStorageInfo',
}

//出库信息
export const outstorage = {
  query: '/api/v1/product/queryOutStorageList',
  addOrUpdate: '/api/v1/product/addOrUpdateOutStorage',
  delete: '/api/v1/product/removeOutStorageInfo',
}

//库存信息
export const stock = {
  query: '/api/v1/product/queryStockList',
  addOrUpdate: '/api/v1/product/addOrUpdateStock',
  delete: '/api/v1/product/removeStockInfo',
}

export const uploadImg = {
  upload: '/api/vi/file/upload',
}
