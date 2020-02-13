import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectCity: "台北市",
    selectDistrict: "北投區",
    list: [],
    pharmaciesData: []
  },
  mutations: {
    SETDATA(state, payload) {
      state.pharmaciesData = payload
    },
    SETLIST(state, list) {
      state.list = list
    },
    SETSELECTDISTRICT(state, payload) {
      state.selectDistrict = payload
    }
  },
  actions: {
    GETDATA(context) {
      return axios
        .get(
          "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
        )
        .then(res => {
          context.commit("SETDATA", res.data.features)
        })
    },
    GETLIST(context) {
      //console.log(context)
      return axios.get("/list.json").then(res => {
        //console.log(res.data)
        context.commit("SETLIST", res.data)
      })
    }
  },
  modules: {}
})
