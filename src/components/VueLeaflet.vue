<template>
  <div class="vue-leaflet">
    <l-map
      :zoom="zoom"
      :center="center"
      style="width: 100%; height: 600px;"
    >

      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <!--
      <l-marker
        v-for="(item,key) in markerList"
        :key="key"
        :lat-lng="item.geometry"
      >
        <l-popup :content="text">
          <v-btn>123</v-btn>
        </l-popup>
      </l-marker>
      -->

    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet"
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster"

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
      zoom: 16,
      center: L.latLng(25.1296705, 121.5268667),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(25.1296705, 121.5268667),
      text: "this is a marker"
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>




