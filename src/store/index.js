import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    center: L.latLng(25.0292998, 121.5030307),
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
    },
    markerCenter: (state, getters) => {
      if (!getters.markerList) return state.center
      if (state.selectPharmacy) {
        return markerList.filter(
          el => el.properties.name === state.selectPharmacy
        )["geometry"]
      }
      if (getters.markerList) return getters.markerList[0]["geometry"]
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
    },
    UPDATE_DISTRICT_MESSAGE(state, district) {
      state.selectDistrict = district
    },
    UPDATE_PHARMACY_MESSAGE(state, pharmacy) {
      console.log("this is mutation :" + pharmacy, typeof pharmacy)
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
