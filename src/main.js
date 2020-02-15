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
 * 做出篩選縣市及行政區 => 已完成
 * ajax call 資料，先顯示藥局地圖資訊 => 已完成
 * 圖標圖層 cluster 套件
 * LeogJson
 *
 *
 * 問題紀錄：
 * Icon 物件源碼
 * Icon.Default 是什麼東西 => 應該是預設的 icon 圖標
 * 什麼情況可以一次引入所有組件，就像 Vuetufy 那樣可以一次使用所有組件
 * this.$nextTick 跟 this.$refs 的引用
 * 初始化會出現沒有 markerList 而間接引發的沒有 markerCenter 問題
 * 圖層簡單一點，不要用到這麼複雜
 * marker icon custom
 *
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
