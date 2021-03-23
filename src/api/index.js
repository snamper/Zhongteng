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

//申请信息
export const applyInfo = {
  query: '/api/v1/repair/queryApplicationList',
  addOrUpdate: '/api/v1/repair/addOrUpdateApplication',
  delete: '/api/v1/repair/removeApplicationInfo',
}
//
