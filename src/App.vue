<template>
  <v-app>
    <v-toolbar>
      <headercomp/>
    </v-toolbar>
    <v-content>
      <router-view :key="$route.fullpath"/>

      <footercomp/>
    </v-content>
  </v-app>
</template>

<script>
import headercomp from "./components/header";
import footercomp from "./components/footer";
export default {
  name: "App",
  components: {
    headercomp,
    footercomp
  },

  data() {
    return {
      //
    };
  }
};
</script>