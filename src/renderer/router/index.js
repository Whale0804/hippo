import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面配置
const routes = [{
  path: '/index',
  name: 'index',
  redirect: {name: 'hello'},
  component: require('@/components/frameViews').default,
  children: [
    {
      path: '/hello',
      name: 'hello',
      component: require('@/components/HelloWorld').default
    }
  ]
}, {
  path: '/',
  name: 'login',
  component: require('@/components/login').default
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
