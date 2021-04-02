import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import axios from '@/api/axios'
import Moment from 'moment'
import _ from 'lodash'
import JsonExcel from 'vue-json-excel'
import * as echarts from 'echarts'
import { pagination } from '@/mixins'
Vue.prototype.$echarts = echarts
import EchartsBox from '@/components/EchartsBox'
Vue.prototype.$_ = _
Vue.prototype.$moment = Moment
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value, isHourse = false) {
  if (isHourse) {
    return value ? Moment(value).format('YYYY-MM-DD HH:mm:ss') : '暂无'
  } else {
    return value ? Moment(value).format('YYYY-MM-DD ') : '暂无'
  }
})
Vue.config.devtools = true
//全局分页混入
Vue.mixin(pagination)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.component('downloadExcel', JsonExcel)
Vue.component('echartsBox', EchartsBox)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
