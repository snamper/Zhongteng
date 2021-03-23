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
        path: '/cart/factory',
        name: 'Cartfactory',
        component: () =>
          import(
            /* webpackChunkName: "CartIndex" */ '../views/Cart/factory.vue'
          ),
        meta: {
          title: '厂家管理',
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
      title: '维修审核',
      icon: 'el-icon-s-comment',
    },
    children: [
      {
        path: '/repair/index',
        name: 'RepairIndex',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Repair/index.vue'
          ),
        meta: {
          title: '信息初审',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/repair/info',
        name: 'UserIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/Info/index.vue'),
        meta: {
          title: '信息复审',
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
        name: 'OrderIndex',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/index.vue'
          ),
        meta: {
          title: '车辆交付',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/order/money',
        name: 'Ordermoney',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/money.vue'
          ),
        meta: {
          title: '租金管理',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: '/order/other',
        name: 'Orderother',
        component: () =>
          import(
            /* webpackChunkName: "HomeIndex" */ '../views/Order/other.vue'
          ),
        meta: {
          title: '其他',
          icon: 'el-icon-s-shop',
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
    redirect: '/role/index',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/role/index',
        name: 'RoleIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/Role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-tools',
        },
      },
      {
        path: '/user/index',
        name: 'UserIndex',
        component: () =>
          import(/* webpackChunkName: "HomeIndex" */ '../views/User/index.vue'),
        meta: {
          title: '用户管理',
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
