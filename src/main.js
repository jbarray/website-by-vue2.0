import Vue from 'vue'
import Layout from '../src/components/layout.vue'
 import VueRouter from 'vue-router'
 import VueResource from 'vue-resource'
 import IndexPage from './pages/Index.vue'
 import DetailPage from '../src/pages/detail.vue'
 import OrderListPage from '../src/pages/orderList.vue'
import DetailAnaPage from '../src/pages/detail/analysis.vue'
import DetailCouPage from '../src/pages/detail/count.vue'
import DetailForPage from '../src/pages/detail/forecast.vue'
import DetailPubPage from '../src/pages/detail/publish.vue'
 Vue.use(VueRouter)
 Vue.use(VueResource)
 let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
   }
    ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
   router,
  template: '<Layout/>',
  components: { Layout }
})

