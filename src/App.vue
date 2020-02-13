<template>
  <v-app>
    <v-row>
      <v-col
        cols="3"
        lg="3"
        md="3"
        sm="12"
      >
        <TheSidebar />
      </v-col>
      <v-col
        cols="9"
        lg="9"
        md="9"
        sm="12"
      >
        <VueLeaflet />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TheSidebar from "./components/TheSidebar"
import VueLeaflet from "./components/VueLeaflet"

export default {
  name: "App",
  components: {
    TheSidebar,
    VueLeaflet
  },

  data: () => ({})
}
</script>

<style>
.v-text-field__details {
  display: none;
}
</style>
