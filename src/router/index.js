import Vue from "vue"
import VueRouter from "vue-router"
import VueLeaflet from "@/components/VueLeaflet"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "VueLeaflet",
    component: VueLeaflet
  }
]

const router = new VueRouter({
  routes
})

export default router
