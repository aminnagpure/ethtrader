<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

    <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "addexchange",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$axios
          .get("addexchange?id=" + this.name, {
            method: "GET",
            body: {
              id: this.name
            }
          })
          .then(() => {})
          .catch(err => {
            return err;
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>