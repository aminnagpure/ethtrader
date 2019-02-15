<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn slot="activator" color="primary" dark right>Menu</v-btn>

      <v-list>
        <div v-if="this.$store.state.isLogged">
          <v-list-tile
            v-for="(item, i) in itemslogged"
            :key="i"
            v-on:click="checkclick(item.title,$event)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </div>
        <div v-else>
          <v-list-tile
            v-for="(item, i) in itemsnologged"
            :key="i"
            v-on:click="checkclick(item.title,$event)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { db, provider, auth } from "../components/data";

export default {
  name: "headercomp",
  data: () => ({
    itemslogged: [
      { title: "Home", url: "/" },
      { title: "About us", url: "" },
      { title: "Dashboard", url: "" },
      { title: "Logout", url: "logout" }
    ],
    itemsnologged: [
      { title: "Home", url: "/" },
      { title: "About us", url: "sayhi()" },
      { title: "Login", url: "socialLogin()" }
    ]
  }),
  methods: {
    socialLogin: function() {
      auth
        .signInWithPopup(provider)
        .then(() => {
          // this.$store.dispatch("setUser", result.user);
          //console.log(result.user.displayName);
          this.$store.dispatch("loghimin");
        })
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    gohome() {
      this.$router.replace("/");
    },
    goaboutus() {
      this.$router.replace("/about");
    },
    logout: function() {
      this.$store.dispatch("loghimout");
      auth.signOut();
      this.$router.replace("/");
    },
    godashboard: function() {
      this.$router.replace("/dashboard");
    },

    checkclick(msg) {
      if (msg === "About us") {
        this.goaboutus();
      }
      if (msg === "Login") {
        this.socialLogin();
      }
      if (msg === "Home") {
        this.gohome();
      }
      if (msg === "Dashboard") {
        this.godashboard();
      }
      if (msg === "Logout") {
        this.logout();
      }
    }
  }
};
</script>