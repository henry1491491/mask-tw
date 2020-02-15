<template>
  <v-container class="sidebar">
    <v-card
      color="#F6F6F6"
      outlined
    >
      <v-card-text>
        <v-select
          v-model="selectCity"
          :items="cityList"
          dense
          outlined
        ></v-select>
        <v-select
          v-model="selectDistrict"
          :items="districtList"
          class="mt-1"
          dense
          outlined
        ></v-select>
      </v-card-text>

      <v-card-text class="text-left pt-0">
        有取得口罩數量的藥局有
        <span class="title pharnumber-color">{{pharmaciesNumber}}</span>
        家
      </v-card-text>
    </v-card>

    <div
      id="scroll-target"
      style="max-height: 400px"
      class="overflow-y-auto"
    >
      <v-card
        v-show="markerList.length === 0"
        outline
        min-height="178"
      >
        <v-card-title class="d-flex justify-center align-stretch">
          尚未提供藥局資料！
        </v-card-title>
      </v-card>

      <v-card
        v-for="(item,key) in pharmaciesList"
        :key="key"
        class="mx-auto"
        outlined
        @click="choosePharmacy(item)"
      >
        <v-card-title class="pb-1">
          <span class="title mb-1">{{item.name}}</span>
        </v-card-title>
        <v-card-text class="py-1">
          <v-icon
            class="mr-1"
            v-text="'mdi-map-marker'"
          ></v-icon>
          {{item.address}}
        </v-card-text>
        <v-card-text class="d-flex align-center py-1">
          <v-icon
            class="mr-1"
            v-text="'mdi-phone-classic'"
          ></v-icon>
          {{item.phone}}
        </v-card-text>

        <v-card-actions class="d-flex justify-center mb-2">
          <v-chip
            :color="item.mask_adult > 0 ?  '#668AFE' : '#E2E2E2'"
            :text-color="item.mask_adult > 0 ? '#FFF' : '#9C9C9C'"
            label
            class="mr-1"
            v-text="item.mask_adult > 0 ? `成人 : ${item.mask_adult} 個` : '成人 : 已售完'"
          />
          <v-chip
            :color="item.mask_child > 0 ?  '#668AFE' : '#E2E2E2'"
            :text-color="item.mask_child > 0 ? '#FFF' : '#9C9C9C'"
            label
            v-text="item.mask_child > 0 ? `兒童 : ${item.mask_child} 個` : '兒童 : 已售完'"
          />
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "TheSidebar",
  data: () => ({
    maskNumber: []
  }),
  computed: {
    list() {
      return this.$store.state.list
    },
    cityList() {
      if (!this.list) return
      return Array.from(new Set(this.list.map(el => el.city)))
    },
    districtList() {
      if (!this.cityList || !this.selectCity) return
      return this.list
        .filter(el => el.city === this.selectCity)
        .map(el => el.district)
    },
    markerList() {
      return this.$store.getters.markerList
    },
    pharmaciesData() {
      return this.$store.state.pharmaciesData
    },
    pharmaciesList() {
      return this.pharmaciesData
        .filter(el => {
          return (
            el.properties.county === this.selectCity &&
            el.properties.town === this.selectDistrict
          )
        })
        .map(el => el.properties)
    },
    pharmaciesNumber() {
      return this.pharmaciesData.filter(el => {
        return el.properties.mask_adult !== 0 || el.properties.mask_child !== 0
      }).length
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
        this.$store.commit("UPDATE_PHARMACY_MESSAGE", val.name)
      }
    }
  },
  mounted() {
    this.$store.dispatch("getList")
    this.$store.dispatch("getPharmaciesData")
  },
  methods: {
    choosePharmacy(item) {
      this.$store.dispatch("choosePharmacy", item.name)
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  .pharnumber-color {
    color: #668afe;
  }
}
</style>
