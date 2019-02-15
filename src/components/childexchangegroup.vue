
<template>
  <v-layout child-flex :class="splclass">
    <v-card raised v-if="items.length>0">
      <v-card-title>
        <span class="headline font-weight-bold">{{items[0].name}}</span>
      </v-card-title>

      <v-card-text class="title font-weight-light">
        difference in balance
        {{finaleth()}}
      </v-card-text>
      <v-card-text>
        {{msg}}
        {{finalsay()}}
      </v-card-text>

      <v-spacer></v-spacer>
    </v-card>
  </v-layout>
</template>

<script>
import { db } from "./data.js";

export default {
  name: "childexchangegroup",
  data: function() {
    return { items: [], splclass: "cssprops" };
  },

  created() {
    this.getdata();
  },
  props: ["msg"],
  methods: {
    getdata() {
      console.log("getdata");
      db.collection("exchangesgroup")
        .where("name", "==", this.msg)
        .orderBy("dt", "desc")
        .limit(1)
        .onSnapshot(abc => {
          abc.docChanges().forEach(ll => {
            // console.log(ll.doc.data());
            this.items.push(ll.doc.data());
          });
        });
    },

    finaleth() {
      if (this.items.length > 0) {
        return this.items[0].totaleth; //- this.items[this.items.length - 1].totaleth
      }
    },
    finalsay() {
      //  console.log(this.finaleth());
      let kk = this.finaleth();
      console.log("kk", kk);
      if (kk > 100000) {
        this.splclass = "redclass";
        return "market looks like it gona collapse " + kk;
      }
      if (kk > 90000) {
        this.splclass = "redclass";
        return "market will be  very heavy down red " + kk;
      }
      if (kk > 80000) {
        this.splclass = "redclass";
        return "market will be very heavy red " + kk;
      }
      if (kk > 70000) {
        this.splclass = "redclass";
        return "market will be heavy red " + kk;
      }
      if (kk > 60000) {
        this.splclass = "redclass";
        return "market will be heavy red " + kk;
      }
      if (kk > 50000) {
        this.splclass = "purpleclass";
        return "market will be  red " + kk;
      }
      if (kk > 40000) {
        this.splclass = "redclass";
        return "market will be quite red " + kk;
      }
      if (kk > 30000) {
        this.splclass = "redclass";
        return "market will be red " + kk;
      }
      if (kk > 1000) {
        this.splclass = "lightredclass" + kk;
        return "some red, price may drop 1 or 2% " + kk;
      }
      if (kk > 100) {
        this.splclass = "lightredclass";
        return "some red, price may drop 1 or 2% " + kk;
      }
      if (-500000 > kk) {
        this.splclass = "supergreenclass";
        return "market looks like it gona super pump very hard " + kk;
      }
      if (-100000 > kk) {
        this.splclass = "greenclass";
        return "market looks like it gona pump very hard " + kk;
      }
      if (-90000 > kk) {
        this.splclass = "greenclass";
        return "market looks like it gona pump  hard " + kk;
      }
      if (-80000 > kk) {
        this.splclass = "greenclass";
        return "market looks like it gona pump quite hard " + kk;
      }
      if (-70000 > kk) {
        this.splclass = "greenclass";
        return "market looks like it gona pump a lot " + kk;
      }
      if (-60000 > kk) {
        this.splclass = "greenclass";
        return "market looks like it gona pump " + kk;
      }
      if (-50000 > kk) {
        this.splclass = "greenclass";
        return "some pumping " + kk;
      }
      if (-1000 > kk) {
        this.splclass = "greenclass";
        return (
          "not much to say but Slight Greenery expected, mostly 1-2% " + kk
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.redclass {
  .theme--light.v-sheet {
    background-color: white;
    body {
      color: green;
    }
  }
}

.greenclass {
  .theme--light.v-sheet {
    background-color: green;
  }
}
.purpleclass {
  .theme--light.v-sheet {
    background-color: orangered;
  }
}
.supergreenclass {
  .theme--light.v-sheet {
    background-color: greenyellow;
  }
}
.lightredclass {
  .theme--light.v-sheet {
    background-color: #ffa07a;
  }
}
</style>
