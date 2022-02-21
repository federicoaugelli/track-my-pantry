<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-button slot="end" @click="closeModal" color="jjj">
        Close
      </ion-button>
    </ion-toolbar>
  </ion-header>

    <!-- ADD PRODUCT TO GLOBAL DATABASE -->
    <ion-content class="ion-padding" color="" fullscreen v-if="loader == false">
      <div style="margin: 20px; text-align: center;">
      <ion-text>
        <h2 style="text-align: center;">Digit your barcode</h2>
      </ion-text>
      <ion-input v-model="barcodee" type="search" placeholder="digit your barcode" enterkeyhint="search" inputmode="numeric" required>
      </ion-input>
      <ion-item-divider color=""></ion-item-divider>

      <ion-text>
        <h3 style="text-align: center;">nome prodotto</h3>
      </ion-text>
      <ion-input v-model="namee" type="search" placeholder="product name" enterkeyhint="search" required>
      </ion-input>

      <ion-text>
        <h3 style="text-align: center;">descrizione prodotto</h3>
      </ion-text>
      <ion-input v-model="descriptionn" type="search" placeholder="description" enterkeyhint="search" required>
      </ion-input>

      <div style="height: 30px;"></div>

      <ion-button color="tertiary" expand="full" @click="postProductDetails">Post product</ion-button>
      </div>
    </ion-content>

    <ion-content v-if="loader == true">
      <div>
        <h3>product successfully uploaded!</h3>
      </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItemDivider, IonText, modalController, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from "axios";
import { projectEndpoint } from "../UsefulData"

export default defineComponent({
  name: 'Modal',
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItemDivider, IonText },
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
      namee: '',
      descriptionn: '',
      barcodee: '',
      //projectEndpoint: 'https://lam21.iot-prism-lab.cs.unibo.it/',
      loader: false,
      //token: 'ckwxqeyrp1826052bqxjr6fr8g9'
    };
  },

  methods: {
    closeModal(){
      modalController.dismiss()
    },

    /* POST PRODUCT DETAILS */
    postProductDetails() {
      const product = { token: this.$store.state.sessiontoken, name: this.namee, description: this.descriptionn, barcode: this.barcodee, test: true }
      if (product.barcode != '' && product.token != '' && product.name != '' && product.description != '') {
        axios.post(this.$store.state.projectEndPoint + "products", product, {
          headers: {
            Authorization: this.$store.state.token
          }
        }).then((result) => {
          this.closeModal();
        })
        .catch(error => {
          this.openFailedToast();
        })
      }
      else {
        this.openFailedToast();
      }
    },

    /* toast */
    async openFailedToast() {
      const toast = await toastController
        .create({
          message: 'Error',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },
  },
});
</script>

<style type="text/css">
  
</style>