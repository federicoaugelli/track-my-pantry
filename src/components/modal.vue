<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" color="" fullscreen>
	<ion-text>
		<h2>Digit your barcode:</h2>
	</ion-text>
    <ion-input type="search" placeholder="digit your barcode" color="secondary" enterkeyhint="search" inputmode="numeric" required>
    </ion-input>
    <ion-item-divider color=""></ion-item-divider>
    <ion-text>
		<h2>Or take a photo of them!</h2>
    </ion-text>
    <ion-item-divider color=""></ion-item-divider>
    <ion-button color="secondary" shape="round" size="large">Open Camera</ion-button>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItemDivider, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItemDivider, IonText }
});
</script>