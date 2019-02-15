<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      name="exchange"
      required
    ></v-select>

    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

    <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 2000) || "Name must be less than 10 characters"
    ],
    select: null,
    items: []
  }),
  created() {
    //this.$store.dispatch("showExchangenames");
    this.additems();
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    additems() {
      this.$axios.get("getexchangenames").then(dd => {
        //      console.log(dd.data);
        dd.data.forEach(element => {
          this.items.push(element.name);
        });
      });
    }
  }
};
</script>