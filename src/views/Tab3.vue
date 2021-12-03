<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">account</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-button v-show="!users" @click="created()" expand="block">view users</ion-button>
      <ion-list>
        <ion-item v-for="user in users" v-bind:key="user.id">
          <ion-label>{{ user.name }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-button v-show="users" @click="users = null" color="danger">Hide Users</ion-button>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent ({
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      users: null,
      testEndpoint: "https://jsonplaceholder.typicode.com/",
      projectEndpoint: "https://lam21.iot-prism-lab.cs.unibo.it/"
    };
  },
  methods: {
    created() {
      axios.get(this.testEndpoint + "users").then((result) => {
          this.users = result.data;
        });
    },
/*
    register() {
      axios.post(this.projectEndpoint + "users", {
        headers: {
          Authorization: Bearer <accessToken>
        }
      }).then((result) => {
        //some code
      })
    },

    login() {
      axios.post(this.projectEndpoint + "login", {
        headers: {
          Authorization: Bearer <accessToken> 
        }
      }).then((result) => {
        //some code
      })
    },

    getProductsbyBarcode() {
      axios.get(this.projectEndpoint + "products?barcode=" + "0000000000000").then((result) => {
        //some code
      })
    },

    postProductDetails() {
      axios.post(this.projectEndpoint + "products", {
        headers: {
          Authorization: Bearer <accessToken>
        }
      }).then((result) => {
        //some code
      })
    },

    postProductPreference() {
      axios.post(this.projectEndpoint + "votes", {
        headers: {
          Authorization: Bearer <accessToken>
        }
      }).then((result) => {
        //some code
      })
    }
*/
  },
});
</script>