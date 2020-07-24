import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    user: ""
  },
  mutations: {
    dl(state, vl) {
      if (vl == 1) {
        state.user = ""
      } else {
        state.user = {
          name: '丁保乐',
          token: '1rgersddqgers'
        }
      }
    },

    addCart(state, vl) {
      let index = state.list.findIndex(item => {
        return item._id == vl._id
      })
      if (index != -1) {
        state.list.forEach(item => {
          item.num++
        })
      }else{
        vl.num = 1
        vl.checked = true
        state.list.push(vl)
      }
    },

    gx(state,vl){
        state.list = vl
    }
  },
  actions: {

  },
  plugins: [createPersistedState({
    key: 'stort'
  })]
})
