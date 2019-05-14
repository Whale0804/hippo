import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面配置
const routes = [{
  path: '/index',
  name: 'index',
  redirect: {name: 'info'},
  component: require('@/components/FrameViews').default,
  children: [
    {
      path: '/info',
      name: 'info',
      component: require('@/components/RedisInfo').default
    }
  ]
}, {
  path: '/',
  name: 'login',
  component: require('@/components/Login').default
},{
  path: '*',
  redirect: '/'
}]

// 滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { y: 0 }
  }
}

// 嵌入路由
const router = new Router({
  routes,
  scrollBehavior,
  linkActiveClass: 'active'
})

export default router
