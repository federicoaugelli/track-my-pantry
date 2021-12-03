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

      <ion-searchbar placeholder="Search product by barcode" inputmode="numeric" debounce="500" show-cancel-button="focus">
      </ion-searchbar>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, modalController, IonSearchbar } from '@ionic/vue';
import { add } from 'ionicons/icons';
import axios from "axios";
import Modal from "@/components/modal.vue"

export default  {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonFab, IonFabButton, IonSearchbar },
  setup() {
    return {
      add,
    }
  },

  methods: {
    async openModal() {
      const modal = await modalController
        .create({
          component: Modal,
          componentProps: {
            title: "Add product to your pocket"
          },
        })
      return modal.present();
    }
  }

}
</script>