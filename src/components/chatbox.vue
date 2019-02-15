<template>
  <v-card color="blue lighten-2" dark>
    <v-card-text>
      <ul v-for="(ch,i) in chatmsg" :key="i">
        <li>{{ch.name}} -{{ch.srno}} {{ch.msg}}</li>
      </ul>
      <v-text-field v-model="msg" ></v-text-field>

      <v-btn block color="secondary" @click="insertchat()" dark>Send Chat</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import { db, auth } from "./data";
export default {
  data: () => {
    return {
      msg: "",
      srno: 0,
      chatmsg: []
    };
  },
  created() {
    this.getChats();
  },

  methods: {
    insertchat: function() {
      let abc = {
        name: auth.currentUser.displayName,
        msg: this.msg,
        srno: 0, // this.$store.state.chatmsglastno + 1,
        dt: Date.now()
      };
      this.$axios
        .post("/addchat", abc)
        .then(res => {
          db.collection("chatbox").add({
            name: auth.currentUser.displayName,
            msg: this.msg,
            dt: res.data.dt
          });
        })
        .catch(err => err);
    },
    getChats: function() {
      db.collection("chatbox").onSnapshot(kk => {
        kk.docChanges().forEach(abc => {
          let dd = {
            id: abc.doc.id,
            name: abc.doc.data().name,
            msg: abc.doc.data().msg,
            sno: abc.doc.data().srno
          };
          //console.log(dd);
          this.chatmsg.push(dd);
        });
      });
    }
  }
};
</script>

 