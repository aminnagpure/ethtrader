<template>
  <div>
    <div>
      <div v-for="(dd,i) in items" :key="i">
        <childexchangegroup :msg="dd"/>
      </div>
    </div>
  </div>
</template>
<script>
import childexchangegroup from "./childexchangegroup.vue";

export default {
  name: "exchangesgroup",
  components: {
    childexchangegroup
  },
  data: function() {
    return {
      items: []
    };
  },
  created() {
    //this.groups = [];
    console.log(this.items);
    this.adddata();
  },
  methods: {
    adddata() {
      console.log("add data called");
      this.$axios.get("getexchangenames").then(dd => {
        console.log(dd.data);
        dd.data.forEach(element => {
          this.items.push(element.name);
        });
      });
      console.log(this.items);
    }
  }
};
</script>
