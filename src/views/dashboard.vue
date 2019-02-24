<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card color="purple" dark>
          <v-card-title primary class="title">Groups</v-card-title>
          <v-card-text>Negative balance means 'Possible Green Market', Positive Balance means 'Down Market'
            <pastdata/>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="indigo" dark>
              <v-card-text>
                <completemarketwatch/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <div raised v-if="items.length>0">
          <v-card white v-for="(ch,i) in items" :key="i">
            <v-card-text>
              <v-card>
                <v-card-title>
                  <span class="headline font-weight-bold">{{ch.name}}</span>
                </v-card-title>

                <v-card-text class="title font-weight-light">
                  difference in balance
                  {{finaleth(i)}}
                </v-card-text>
                <v-card-text>{{finalsay(i)}}</v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-card white>
          <v-card-text>
            <chatbox/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import chatbox from "../components/chatbox";
import pastdata from "../components/pastdata";
import { db } from "../components/data.js";
//import exchangesgroup from "../components/exchangesgroup";
import completemarketwatch from "../components/completemarketwatch";
export default {
  data: function() {
    return {
      lorem: "",
      hugeamt: [],
      exch: [],
      chat: [],
      items: [],
      msg: [],
      splclass: "cssprops"
    };
  },
  components: {
    chatbox,
    completemarketwatch,
    pastdata
  },
  created() {
    this.pushdata();
  },
  methods: {
    pushdata() {
      console.log("getdata");
      db.collection("exchangesgroup")
        .orderBy("dt", "desc")
        .limit(9)
        .onSnapshot(abc => {
          this.items = [];
          abc.forEach(ll => {
            console.log(ll.data());
            this.items.push(ll.data());
          });
        });
    },

    finaleth(itemno) {
      if (this.items.length > 0) {
        return this.items[itemno].totaleth; //- this.items[this.items.length - 1].totaleth
      }
    },
    finalsay(itemno) {
      //  console.log(this.finaleth());
      let kk = this.finaleth(itemno);
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
          " not much to say but Slight Greenery expected, mostly 1-2% " + kk
        );
      }
    }
  }
};
</script>