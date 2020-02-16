import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    list: [],
    selectCity: "臺北市",
    selectDistrict: "中正區",
    selectPharmacy: "",
    pharmaciesData: []
  },
  getters: {
    markerList: state => {
      return state.pharmaciesData
        .filter(el => {
          return (
            el.properties.county === state.selectCity &&
            el.properties.town === state.selectDistrict
          )
        })
        .map(el => {
          return {
            properties: el.properties,
            geometry: L.latLng(
              el.geometry.coordinates[1],
              el.geometry.coordinates[0]
            )
          }
        })
    }
  },
  mutations: {
    SET_LIST(state, list) {
      state.list = list
    },
    SET_PHARMACIES_DATA(state, data) {
      state.pharmaciesData = data
    },
    UPDATE_CITY_MESSAGE(state, city) {
      state.selectCity = city
      state.selectDistrict = state.list
        .filter(el => el.city === state.selectCity)
        .map(el => el.district)[0]
      state.selectPharmacy = ""
    },
    UPDATE_DISTRICT_MESSAGE(state, district) {
      state.selectDistrict = district
      state.selectPharmacy = ""
    },
    UPDATE_PHARMACY_MESSAGE(state, pharmacy) {
      state.selectPharmacy = pharmacy
    }
  },
  actions: {
    getList({ commit }) {
      axios.get("/list.json").then(res => {
        commit("SET_LIST", res.data)
      })
    },
    getPharmaciesData({ commit }) {
      let url = "https://kiang.github.io/pharmacies/json/points.json"
      axios.get(url).then(res => {
        commit("SET_PHARMACIES_DATA", res.data.features)
      })
    },
    choosePharmacy({ commit }, item) {
      commit("UPDATE_PHARMACY_MESSAGE", item)
    }
  },
  modules: {}
})
