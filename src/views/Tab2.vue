<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Products</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My products</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-for="item in items" :key="item.text">
        <ion-item>
          <ion-list-header>{{ item.text }}</ion-list-header>
          <ion-button color="tertiary" fill="outline" shape="round" size="default">{{ item.barcode }}</ion-button>
        </ion-item>
      </ion-list>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonListHeader } from '@ionic/vue';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonButton, IonListHeader },

  setup() {
    const items = [{
      "text": "CAROTA",
      "barcode": "000000000000"
    },
    {
      "text": "CIPOLLA",
      "barcode": "111111111111"
    },
    {
      "text": "BAMBINI",
      "barcode": "222222222222"
    },
    {
      "text": "TORTA",
      "barcode": "333333333333"
    },
    {
      "text": "LIMONE",
      "barcode": "444444444444"
    },
    {
      "text": "CIPOLLA",
      "barcode": "111111111111"
    },
    {
      "text": "BAMBINI",
      "barcode": "222222222222"
    },
    {
      "text": "TORTA",
      "barcode": "333333333333"
    },
    {
      "text": "LIMONE",
      "barcode": "444444444444"
    },
    {
      "text": "CIPOLLA",
      "barcode": "111111111111"
    },
    {
      "text": "BAMBINI",
      "barcode": "222222222222"
    },
    {
      "text": "TORTA",
      "barcode": "333333333333"
    },
    {
      "text": "LIMONE",
      "barcode": "444444444444"
    }
    ];
    return {items}
  }
}
</script>