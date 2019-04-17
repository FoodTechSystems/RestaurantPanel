'use strict';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const auth = router.options.routes[1].meta.authorized
  if(to.meta.authorized === false) {
    next(from)
  } else if (to.path === "/" && auth === true) {
    next("/main")
  } else {
    next()
  }
});


moment.lang('ru');

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
