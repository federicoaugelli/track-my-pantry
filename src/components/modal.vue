<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding" color="" fullscreen v-if="loader == false">
      <ion-text>
        <h2 style="text-align: center;">Digit your barcode:</h2>
      </ion-text>
      <ion-input v-model="barcodee" type="search" placeholder="digit your barcode" enterkeyhint="search" inputmode="numeric" required>
      </ion-input>
      <ion-item-divider color=""></ion-item-divider>
      <ion-text>
        <h2 style="text-align: center;">Or take a photo of them!</h2>
      </ion-text>
      <ion-item-divider color=""></ion-item-divider>
      <ion-button color="tertiary" size="medium">Open Camera</ion-button>
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

      <ion-item-divider></ion-item-divider>

      <ion-button color="tertiary" expand="full" @click="postProductDetails">Post product</ion-button>
    </ion-content>

    <ion-content v-if="loader == true">
      <div>
        <h3>product successfully uploaded!</h3>
      </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItemDivider, IonText } from '@ionic/vue';
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
      token: 'ckwxqeyrp1826052bqxjr6fr8g9'
    };
  },

  methods: {
    postProductDetails() {
      const product = { token: this.token, name: this.namee, description: this.descriptionn, barcode: this.barcodee, test: false }
      axios.post(projectEndpoint + "products", product, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJja3d4cWM2ZnAxODI1ODYyYnF4ancwcHluMGoiLCJpYXQiOjE2Mzk1OTAyOTgsImV4cCI6MTY0MDE5NTA5OH0.5vGgMPY-HpTAAix51AlmB26p_GYeJ9lzJleCN_5G_WQ'
        }
      }).then((result) => {
        console.log(result.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
});
</script>