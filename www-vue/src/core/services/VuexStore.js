import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ResourceListData: []
  },
  actions: {
    SetResourceListData: function ({ commit }, data) {
      commit('SetResourceListData', data)
    },
    SetResourceListColumn: function ({ commit }, column) {
      commit('SetResourceListColumn', column)
    }
  },
  mutations: {
    SetResourceListData: function (state, newData) {
      state.ResourceListData = newData
    },
    SetResourceListColumn: function (state, newColumn) {
      state.ResourceListColumn = newColumn.reduce((acc, item) => {
        acc[item.label] = item.name
        return acc
      }, {})
    }
  },
  getters: {
    ResourceListData: state => {
      return state.ResourceListData
    },
    ResourceListColumn: state => {
      return state.ResourceListColumn
    }
  }
})

export default store
