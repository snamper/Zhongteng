import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'
import NProgress from 'nprogress'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export const routes = [
  {
    path: '/',
    redirect: '/home/index',
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: '/home/index',
        name: 'HomeIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/Home/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
        },
      },
    ],
  },
  {
    path: '/cart',
    name: 'Cart',
    redirect: '/cart/index',
    component: Layout,
    meta: {
      title: '车辆管理',
      icon: 'el-icon-s-marketing',
    },
    children: [
      {
        path: '/cart/index',
        name: 'CartIndex',
        component: () =>
          import(/* webpackChunkName: "CartIndex" */ '../views/Cart/index.vue'),
        meta: {
          title: '车辆管理',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/cart/customer',
        name: 'Cartcustomer',
        component: () =>
          import(
            /* webpackChunkName: "CartIndex" */ '../views/Cart/customer.vue'
          ),
        meta: {
          title: '客户管理',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/cart/service',
        name: 'Cartservice',
        component: () =>
          import(
            /* webpackChunkName: "CartIndex" */ '../views/Cart/service.vue'
          ),
        meta: {
          title: '维修服务站信息',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/cart/factory',
        name: 'Cartfactory',
        component: () =>
          import(
            /* webpackChunkName: "CartIndex" */ '../views/Cart/factory.vue'
          ),
        meta: {
          title: '主机厂管理',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/cart/insurance',
        name: 'CartInsurance',
        component: () =>
          import(
            /* webpackChunkName: "CartIndex" */ '../views/Cart/insurance.vue'
          ),
        meta: {
          title: '保险管理',
          icon: 'el-icon-s-marketing',
        },
      },
    ],
  },
  {
    path: '/repair',
    name: 'Repair',
    redirect: '/repair/index',
    component: Layout,
    meta: {
      title: '维修管理',
      icon: 'el-icon-s-comment',
    },
    children: [
      {
        path: '/repair/application',
        name: 'RepairApplication',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Repair/application.vue'
          ),
        meta: {
          title: '维修审核',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/repair/receipt',
        name: 'RepairIndex',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Repair/receipt.vue'
          ),
        meta: {
          title: '回执审核',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/repair/count',
        name: 'UserIndex',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Repair/count.vue'
          ),
        meta: {
          title: '维修汇总',
        },
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    redirect: '/order/index',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-shop',
    },
    children: [
      {
        path: '/order/index',
        name: 'OrderIndex-',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/order.vue'
          ),
        meta: {
          title: '车辆订单管理',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/order/deliver',
        name: 'Orderdeliver',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/deliver.vue'
          ),
        meta: {
          title: '车辆交付管理',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/order/total',
        name: 'Ordertotal',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/total.vue'
          ),
        meta: {
          title: '交付信息统计',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/order/rent',
        name: 'Orderrent',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/Order/rent.vue'),
        meta: {
          title: '租金管理',
          icon: 'el-icon-s-shop',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    redirect: '/product/index',
    component: Layout,
    meta: {
      title: '配件管理',
      icon: 'el-icon-s-marketing',
    },
    children: [
      {
        path: '/product/product',
        name: 'ProductProduct',
        component: () =>
          import(
            /* webpackChunkName: "ProductIndex" */ '../views/Product/product.vue'
          ),
        meta: {
          title: '配件档案信息',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/product/instorage',
        name: 'ProductInstorage',
        component: () =>
          import(
            /* webpackChunkName: "ProductIndex" */ '../views/Product/instorage.vue'
          ),
        meta: {
          title: '入库管理',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/product/outstorage',
        name: 'Productoutstorage',
        component: () =>
          import(
            /* webpackChunkName: "ProductIndex" */ '../views/Product/outstorage.vue'
          ),
        meta: {
          title: '出库管理',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/product/stock',
        name: 'Productstock',
        component: () =>
          import(
            /* webpackChunkName: "ProductIndex" */ '../views/Product/stock.vue'
          ),
        meta: {
          title: '库存管理',
          icon: 'el-icon-s-marketing',
        },
      },
    ],
  },

  {
    path: '/datasys',
    name: 'Datasys',
    redirect: '/datasys/index',
    component: Layout,
    meta: {
      title: '数据统计',
      icon: 'el-icon-s-shop',
    },
    children: [
      {
        path: '/datasys/index',
        name: 'DatasysIndex',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/DataSys/index.vue'
          ),
        meta: {
          title: '数据统计',
          icon: 'el-icon-s-data',
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/index',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/user/index',
        name: 'UserIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/User/index.vue'),
        meta: {
          title: '账户管理',
          icon: 'el-icon-s-tools',
        },
      },
      {
        path: '/user/role',
        name: 'RoleIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/Role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-tools',
        },
      },
      {
        path: '/user/info',
        name: 'RoleIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/User/info.vue'),
        meta: {
          title: '日志管理',
          icon: 'el-icon-s-tools',
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  const token = localStorage.getItem('token')
  if (to.path == '/login' || from.path == '/login') {
    if (token) {
      next('/home')
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router
