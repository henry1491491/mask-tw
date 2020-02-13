import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
})

/**
 * 功能迭代：
 * 做出篩選縣市及行政區
 * ajax call 資料，先顯示藥局地圖資訊
 * 圖標圖層 cluster 套件
 *
 *
 * 問題紀錄：
 * Icon 物件源碼
 * Icon.Default 是什麼東西
 * 什麼情況可以一次引入所有組件，就像 Vuetufy 那樣可以一次使用所有組件
 * this.$nextTick 跟 this.$refs 的引用
 * 假如專案裡的某些設定檔錯誤，最有效根本的解決辦法？
 *
 * 筆記記錄：
 * 可以透過 myMap 這個物件的 mapObject 屬性去調用方法跟屬性
 */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
