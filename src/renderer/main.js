import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n';
import ElementUI from 'element-ui';
import '../../static/theme/index.css';
Vue.use(ElementUI);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

Vue.http = Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  i18n,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
