<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Track my pantry</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Track my pantry</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-searchbar v-model="barcode" enterkeyhint="enter" placeholder="Search product by barcode" inputmode="sarch" debounce="50" show-cancel-button="focus" @click="getProductbyBarcode()" autocomplete="false" cancel-button-icon search-icon>
      </ion-searchbar>

      <div style="text-align: center; margin-top: 15em" v-if="products == ''">
        <ion-label>product not found?</ion-label>
        <ion-item-divider></ion-item-divider>
        <ion-button @click="openModal">add to pantry!</ion-button>
      </div>

      <!-- <ion-item v-for="product in products" :key="product.id"> -->
      <ion-card v-for="product in products" :key="product.id">
        <div v-if="product.barcode != ''">
          <ion-card-header>
            <ion-card-title style="text-align: center;">{{ product.name }}</ion-card-title>
            <ion-card-subtitle>barcode: {{ product.barcode }}</ion-card-subtitle>
            <ion-img v-if="product.img" :src="product.img"></ion-img>
          </ion-card-header>
          <ion-card-content>
            <ion-item>{{ product.description }}</ion-item>
            <ion-button color="tertiary" expand="block">add to pantry</ion-button>
            <ion-item>
              <ion-label>created: {{ product.createdAt }}</ion-label>
              <ion-label>updated: {{ product.updatedAt }}</ion-label>
            </ion-item>
          </ion-card-content>
        </div>
      </ion-card>
      <!-- </ion-item> -->
    
    </ion-content>
  </ion-page>
</template>

<!--
    1. Creare chiamate di base
    2. Implementare caso d'uso 1 (update barcode knowledge base)
    3. Correggere cose...
-->

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, modalController, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonButton, IonItemDivider } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { defineComponent } from 'vue';
import axios from "axios";
import Modal from "@/components/modal.vue"
import { projectEndpoint } from "../UsefulData"

export default defineComponent ({
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonFab, IonFabButton, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonButton, IonItemDivider },
  setup() {
    return {
      add
    }
  },

  data() {
    return {
      //projectEndpoint: "https://lam21.iot-prism-lab.cs.unibo.it/",
      barcode: '',
      products: null
    };
  },

  methods: {
    getProductbyBarcode() {
      axios.get(projectEndpoint + 'products?barcode=' + this.barcode, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJja3d4cWM2ZnAxODI1ODYyYnF4ancwcHluMGoiLCJpYXQiOjE2Mzk1OTAyOTgsImV4cCI6MTY0MDE5NTA5OH0.5vGgMPY-HpTAAix51AlmB26p_GYeJ9lzJleCN_5G_WQ'
        }
      }).then((result) => {
        this.products = result.data.products;
        console.log(result.data);
        //tmpToken = result.data.token
      })
    },

    async openModal() {
      const modal = await modalController
        .create({
          component: Modal,
          componentProps: {
            title: "Add product to your pocket"
          },
        })
      return modal.present();
    },
  },
})
</script>