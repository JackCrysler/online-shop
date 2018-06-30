import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
  httpInstance
} from '@/utils/request.js'
import router from '@/router/config'
import {getCookie} from '@/utils/utils'
let store = new Vuex.Store({
  state: {
    catagoryData: {

    },
    cartList: []
  },
  mutations: {
    updateList(state, payload) {
      let o = { ...state.catagoryData
      };
      o[payload.id] = payload.data.secondLevelCategories;
      state.catagoryData = o
    },
    updateCartList(state, payload) {
      state.cartList = payload
    }
  },
  actions: {
    fetchList({
      state,
      commit
    }, cid) {
      if (!state.catagoryData[cid]) {
        httpInstance.get(`/api/catagory?cid=${cid}`)
          .then(res => {
            commit('updateList', {
              id: cid,
              data: res
            })
          });
      }
    },
    fetchCartList({
      commit
    }) {
      httpInstance
        .post("/api/goodslist", {
          token: getCookie("token")
        })
        .then(res => {
          if (res.code == 0) {
            if (confirm("登录超时，请重新登陆")) {
              router.push({
                name: "login",
                query: {
                  from: "cart"
                }
              });
            } else {

            }
          } else {
            commit('updateCartList', res.data)

          }
        });

    }
  },
  getters: {},
  modules: {}
})

/* store.subscribe(() => {
  console.log(store.state.catagoryData)
}) */

export default store
