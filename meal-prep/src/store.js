import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/request/http-common'
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orders:[],
    currentOrder:{},
    newOrders: false,
  },

  getters: {
    getOrders(state) {
      return state.orders
    },
    getCurrentOrder(state) {
      return state.currentOrder
    },
    getOrdersState(state) {
      return state.newOrders
    }
  },

  mutations: {
    updateOrders(state, orders) {
      state.orders = orders
    },
    updateOrdersState(state, props) {
      state.newOrders = props;
    },
    updateCurrentOrder(state, currentOrder) {
      state.currentOrder = currentOrder
    }
  },

  actions: {
    loadData({commit}){
      HTTP.get('/system/restaurant/orders')
      .then(res => {
        const newOrdersCount = res.data.filter((a)=> a.order_status === 0).length;
        const currentOrdesCount = this.state.orders.filter((a)=> a.order_status === 0).length;

        commit('updateOrders', res.data);

        if (newOrdersCount > 0 && newOrdersCount > currentOrdesCount) {
          commit('updateOrdersState', true)
        }
      })
      .catch(e => {
        // console.log(e);
        // router.push("/");
      })
    },

    getCurrentOrder({ commit }, id) {
      HTTP.get(`/system/restaurant/order/${id}`)
      .then(res => {
        commit('updateCurrentOrder', res.data)
      })
      .catch(e => {
        // console.log(e);
        // router.push("/");
      })
    }
  }
});

