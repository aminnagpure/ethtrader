<template>
  <v-flex d-flex child-flex>
    <div raised v-if="items.length>0">
      <v-card white v-for="(ch,i) in items" :key="i">
        <v-card-text>
          <v-card>
            <v-card-title>
              <span
                class="headline font-weight-bold"
              >Previous Ethereum Balances in Exchanges {{i+1}}</span>
            </v-card-title>

            <v-card-text class="title font-weight-light">{{ch.totalethall}}</v-card-text>
            <v-card-text class="title font-weight-light">{{ch.dt |dtfilter}}</v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </div>
  </v-flex>
</template>
<script>
import { db } from "./data";
import moment from "moment";

export default {
  data: function() {
    return { items: [] };
  },
  created() {
    this.items = [];
    this.checkgroupdata();
    //this.getdistinctbal();

    //console.log(this.allexchgroup);
  },
  methods: {
    checkgroupdata() {
      this.items = [];
      db.collection("allexchanges")
        .orderBy("dt", "desc")
        .limit(100)
        .onSnapshot(abc => {
          this.items = [];
          abc.forEach(ll => {
            // console.log(ll.data());
            this.items.push(ll.data());
          });
        });
    },
    finaleth(itemno) {
      if (this.items.length > 0) {
        return this.items[itemno].totalethall; //- this.items[this.items.length - 1].totaleth
      }
    },
    finalsay(itemno) {
      //  console.log(this.finaleth());
      let kk = this.finaleth(itemno);
      console.log("kk", kk);
      if (kk > 100000) {
        //this.splclass = "redclass";
        return "market looks like it gona collapse " + kk;
      }
      if (kk > 90000) {
        //this.splclass = "redclass";
        return "market will be  very heavy down red " + kk;
      }
      if (kk > 80000) {
        //this.splclass = "redclass";
        return "market will be very heavy red " + kk;
      }
      if (kk > 70000) {
        //this.splclass = "redclass";
        return "market will be heavy red " + kk;
      }
      if (kk > 60000) {
        //this.splclass = "redclass";
        return "market will be heavy red " + kk;
      }
      if (kk > 50000) {
        //this.splclass = "purpleclass";
        return "market will be  red " + kk;
      }
      if (kk > 40000) {
        //this.splclass = "redclass";
        return "market will be quite red " + kk;
      }
      if (kk > 30000) {
        //this.splclass = "redclass";
        return "market will be red " + kk;
      }
      if (kk > 1000) {
        //this.splclass = "lightredclass" + kk;
        return "some red, price may drop 1 or 2% " + kk;
      }
      if (kk > 100) {
        //this.splclass = "lightredclass";
        return "some red, price may drop 1 or 2% " + kk;
      }
      if (-500000 > kk) {
        //this.splclass = "supergreenclass";
        return "market looks like it gona super pump very hard " + kk;
      }
      if (-100000 > kk) {
        //this.splclass = "greenclass";
        return "market looks like it gona pump very hard " + kk;
      }
      if (-90000 > kk) {
        //this.splclass = "greenclass";
        return "market looks like it gona pump  hard " + kk;
      }
      if (-80000 > kk) {
        //this.splclass = "greenclass";
        return "market looks like it gona pump quite hard " + kk;
      }
      if (-70000 > kk) {
        //this.splclass = "greenclass";
        return "market looks like it gona pump a lot " + kk;
      }
      if (-60000 > kk) {
        //this.splclass = "greenclass";
        return "market looks like it gona pump " + kk;
      }
      if (-50000 > kk) {
        //this.splclass = "greenclass";
        return "some pumping " + kk;
      }
      if (-1000 > kk) {
        //this.splclass = "greenclass";
        return (
          " not much to say but Slight Greenery expected, mostly 1-2% " + kk
        );
      }
    }
  },
  filters: {
    dtfilter: function(value) {
      if (!value) return "";
      console.log(value);
      // return moment(value, moment.ISO_8601);
      //return moment.toString(value);
    }
  }
};
</script>
