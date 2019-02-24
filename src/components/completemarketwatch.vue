<template>
  <v-layout child-flex :class="splclass">
    <v-card raised v-if="allexchgroup.length>0">
      <v-card-title>
        <span class="headline font-weight-bold">{{finalsay()}}</span>
      </v-card-title>

      <v-card-text class="title font-weight-light"></v-card-text>
      <v-card-text v-if="wheretobuynsell.length>0">
        <div>
          <p>
            {{funcwheretobuynsellmin(wheretobuynsell)}}
            Ethereum will be available cheapest at
            <font
              color="red"
            >{{maxexchangename}}</font>
            {{maxtotaleth}}
          </p>
        </div>
        <div>
          Ethereum will be sold highest at at
          <font color="green">{{minexchangename}}</font>
          {{mintotaleth}}
        </div>
      </v-card-text>

      <v-spacer></v-spacer>
    </v-card>
  </v-layout>
</template>

<script>
import { db } from "../components/data";

export default {
  data: function() {
    return {
      allexchgroup: [],
      splclass: "cssprops",
      wheretobuynsell: [],
      minexchangename: "",
      maxexchangename: "",
      mintotaleth: 0,
      maxtotaleth: 0
    };
  },
  created() {
    this.wheretobuynsell = [];
    this.checkgroupdata();
    this.getdistinctbal();

    //console.log(this.allexchgroup);
  },
  methods: {
    checkgroupdata() {
      this.allexchgroup = [];
      db.collection("allexchanges")
        .orderBy("dt", "desc")
        .limit(1)
        .onSnapshot(abc => {
          this.allexchgroup = [];
          abc.forEach(ll => {
            // console.log(ll.data());
            this.allexchgroup.push(ll.data());
          });
        });
    },
    differencebalfunc() {
      if (this.allexchgroup.length > 0) {
        return this.allexchgroup[0].totalethall;
      }
    },
    getdistinctbal() {
      db.collection("exchangesgroup")
        .orderBy("dt", "desc")
        .limit(9)
        .onSnapshot(abc => {
          this.wheretobuynsell = [];
          abc.forEach(ll => {
            let kkobj = {};
            //console.log(ll.data());
            kkobj.id = ll.id;
            kkobj.name = ll.data().name;
            kkobj.totaleth = ll.data().totaleth;
            this.wheretobuynsell.push(kkobj);
            //constants
            // console.log("this.allexchgroup.length", this.allexchgroup.length);
          });
          //this.differencebalfunc();
        });
    },
    funcwheretobuynsellmin(arr) {
      if (arr.length > 0) {
        var array = arr,
          { min, max } = array.reduce(
            (r, o, i) =>
              i
                ? {
                    min: r.min.totaleth < o.totaleth ? r.min : o,
                    max: r.max.totaleth > o.totaleth ? r.max : o
                  }
                : { min: o, max: o },
            undefined
          );
        //console.log(min.name);

        this.minexchangename = min.name;
        this.mintotaleth = min.totaleth;

        this.maxexchangename = max.name;
        this.maxtotaleth = max.totaleth;
        //return { min: min.exchange };
      }
    },
    /* funcwheretobuynsellMax(arr) {
      if (arr.length > 0) {
        var array = arr,
          { min, max } = array.reduce(
            (r, o, i) =>
              i
                ? {
                    min: r.min.totaleth < o.totaleth ? r.min : o,
                    max: r.max.totaleth > o.totaleth ? r.max : o
                  }
                : { min: o, max: o },
            undefined
          );

        //return { min: min.exchange };
        return (
          "Buy at " +
          max.totaleth +
          " " +
          max.exchange +
          " lot of ether moved to this exchange for sale, it will be relatively cheaper here"
        );
      }
    },*/
    finalsay() {
      //  console.log(this.finaleth());
      let kk = this.differencebalfunc();
      console.log(kk);
      if (kk > 100000) {
        this.splclass = "redclass";
        return (
          "market looks like it gona collapse (" +
          kk +
          ") just some extra ether for sell"
        );
      }
      if (kk > 90000) {
        this.splclass = "redclass";
        return (
          "market will be  very heavy down red (" +
          kk +
          ") just some extra ether for sell"
        );
      }
      if (kk > 80000) {
        this.splclass = "redclass";
        return (
          "market will be very heavy Red (" +
          kk +
          ") just some extra ether for sell"
        );
      }
      if (kk > 70000) {
        this.splclass = "redclass";
        return (
          "market will be heavy red (" + kk + ") just some extra ether for sell"
        );
      }
      if (kk > 60000) {
        this.splclass = "redclass";
        return (
          "market will be heavy red (" + kk + ") just some extra ether for sell"
        );
      }
      if (kk > 50000) {
        this.splclass = "purpleclass";
        return (
          "market will be  red (" + kk + ") just some extra ether for sell"
        );
      }
      if (kk > 40000) {
        this.splclass = "redclass";
        return (
          "market will be quite red (" + kk + ") just some extra ether for sell"
        );
      }
      if (kk > 30000) {
        this.splclass = "redclass";
        return "market will be red (" + kk + ") just some extra ether for sell";
      }
      if (kk > 20000) {
        this.splclass = "redclass";
        return (
          "market will be little red (" +
          kk +
          ") just some extra ether for sell"
        );
      }
      if (kk > 10000) {
        this.splclass = "redclass";
        return (
          "market will be very little red (" +
          kk +
          ") just some extra ether for sell"
        );
      }

      if (kk > 1000) {
        this.splclass = "lightredclass";
        return (
          "some red, price may drop 1 or 2% (" +
          kk +
          ") just some extra ether for sell"
        );
      }

      if (kk > 0) {
        this.splclass = "redclass";
        return (
          "nothing much, flat market will be little red (" +
          kk +
          ") just some extra ether for sell"
        );
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
      if (-100 > kk) {
        this.splclass = "greenclass";
        return "not much it will remain flat " + kk;
      }
      if (-0 > kk) {
        this.splclass = "greenclass";
        return "not much it will remain flat " + kk;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.redclass {
  .theme--dark.v-sheet {
  }
}

.greenclass {
  .theme--dark.v-sheet {
  }
}
.purpleclass {
  .theme--dark.v-sheet {
    background-color: orangered;
  }
}
.supergreenclass {
  .theme--dark.v-sheet {
    background-color: #556b2f;
  }
}
.lightredclass {
  .theme--dark.v-sheet {
    background-color: #ffa07a;
  }
}
</style>
