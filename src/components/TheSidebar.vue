<template>
  <v-container>
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
          @change="chooseDistrict(selectDistrict)"
        ></v-select>

      </v-card-text>
      <v-card-text class="text-left pt-0">
        有取得口罩數量的藥局有
        <span class="title pharnumber-color">{{pharmacyNumber}}</span>
        家
      </v-card-text>
    </v-card>

    <div
      id="scroll-target"
      style="max-height: 400px"
      class="overflow-y-auto"
    >

      <v-card
        v-for="(item,key) in pharmaciesProperties"
        :key="key"
        class="mx-auto"
        outlined
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
            label
            color='#e2e2e2'
            text-color="white"
          >
            成人口罩 {{item.mask_adult}} 個
          </v-chip>

          <v-chip
            label
            text-color="white"
          >
            成人口罩 {{item.mask_adult}} 個
          </v-chip>
        </v-card-actions>

      </v-card>

    </div>

  </v-container>
</template>

<script>
export default {
  name: "TheSidebar",
  data: () => ({
    //
  }),
  computed: {
    cityList() {
      return this.list.map(el => {
        return el.city
      })
    },
    districtList() {
      if (this.selectCity) {
        let ary = []
        this.list.forEach(el => {
          if (el.city === this.selectCity) {
            ary.push(el.district)
          }
        })
        this.$store.commit("SETSELECTDISTRICT", ary[0])
        return ary
      }
    },
    list() {
      return this.$store.state.list
    },
    pharmaciesData: {
      get() {
        return this.$store.state.pharmaciesData
      },
      set(val) {
        this.$store.state.pharmaciesData = val
      }
    },
    pharmacyNumber() {
      if (this.pharmaciesData) {
        let isMaskPhar = this.pharmaciesData.filter(el => {
          return (
            el.properties.mask_child !== 0 || el.properties.mask_adult !== 0
          )
        })
        return isMaskPhar.length
      }
    },
    pharmaciesProperties() {
      return this.pharmaciesData.map(el => el.properties)
    },
    selectCity: {
      get() {
        return this.$store.state.selectCity
      },
      set(val) {
        this.$store.state.selectCity = val
      }
    },
    selectDistrict: {
      get() {
        return this.$store.state.selectDistrict
      },
      set(val) {
        this.$store.state.selectDistrict = val
      }
    }
  },
  mounted() {
    this.$store.dispatch("GETDATA")
    this.$store.dispatch("GETLIST")
  },
  methods: {
    chooseDistrict(item) {
      this.$store.commit("SETSELECTDISTRICT", item)
    }
  }
}
</script>

<style>
.pharnumber-color {
  color: #668afe;
}
</style>
