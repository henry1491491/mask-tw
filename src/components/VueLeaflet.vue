<template>
  <div class="vue-leaflet">
    <l-map
      :zoom="zoom"
      :center="markerCenter"
      style="width: 100%; height: 600px;"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <v-marker-cluster>
        <l-marker
          v-for="(item,index) in markerList"
          :key="index"
          :lat-lng="item.geometry"
          :icon="icon"
        >
          <l-popup>
            <v-card
              class="mx-auto"
              outlined
              flat
            >
              <v-card-title class="pb-1">
                <span class="title mb-1">{{item.properties.name}}</span>
              </v-card-title>
              <v-card-text class="py-1">
                <v-icon
                  class="mr-1"
                  v-text="'mdi-map-marker'"
                />
                {{item.properties.address}}
              </v-card-text>
              <v-card-text class="d-flex align-center py-1">
                <v-icon
                  class="mr-1"
                  v-text="'mdi-phone-classic'"
                />
                {{item.properties.phone}}
              </v-card-text>

              <v-card-actions class="d-flex justify-center mb-2">
                <v-chip
                  :color="item.properties.mask_adult > 0 ? '#668AFE' : '#E2E2E2'"
                  :text-color="item.properties.mask_adult > 0 ? '#FFF' : '#9C9C9C'"
                  label
                  class="mr-1"
                  v-text="item.properties.mask_adult > 0 ? `成人 : ${item.properties.mask_adult} 個` : '成人 : 已售完'"
                />
                <v-chip
                  :color="item.properties.mask_child > 0 ? '#668AFE' : '#E2E2E2'"
                  :text-color="item.properties.mask_child > 0 ? '#FFF' : '#9C9C9C'"
                  label
                  v-text="item.properties.mask_child > 0 ? `兒童 : ${item.properties.mask_child} 個` : '兒童 : 已售完'"
                />
              </v-card-actions>
            </v-card>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet"
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster"
import L from "leaflet"

export default {
  name: "VueLeaflet",
  components: {
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      center: L.latLng(25.0292998, 121.5030307),
      zoom: 16,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: L.icon({
        iconUrl: "/images/markerCustom.svg",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    }
  },
  computed: {
    markerList() {
      return this.$store.getters.markerList
    },
    markerCenter() {
      let geoAry = []
      if (
        this.$store.state.selectPharmacy === "" &&
        this.selectDistrict !== ""
      ) {
        this.markerList.forEach(el => {
          if (el.properties.town === this.$store.state.selectDistrict) {
            geoAry.push(el.geometry)
          }
        })
        return geoAry[0]
      }
      if (this.$store.state.selectPharmacy) {
        this.markerList.forEach(el => {
          if (el.properties.name === this.$store.state.selectPharmacy) {
            geoAry.push(el.geometry)
          }
        })
        return geoAry[0]
      }
      if (!this.markerList || this.markerList.length === 0) {
        return
      }
    },
    selectCity: {
      get() {
        return this.$store.state.selectCity
      },
      set(val) {
        this.$store.commit("UPDATE_CITY_MESSAGE", val)
      }
    },
    selectDistrict: {
      get() {
        return this.$store.state.selectDistrict
      },
      set(val) {
        this.$store.commit("UPDATE_DISTRICT_MESSAGE", val)
      }
    },
    selectPharmacy: {
      get() {
        return this.$store.state.selectPharmacy
      },
      set(val) {
        this.$store.commit("UPDATE_PHARMACY_MESSAGE", val)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.vue-leaflet {
  .leaflet-popup-content-wrapper {
    border: 3px solid #668afe;
  }
  .v-card {
    border-color: #ffffff !important;
  }
}
</style>




