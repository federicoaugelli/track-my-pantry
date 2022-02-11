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

      <ion-button @click="setOpen(true)">Show Modal</ion-button>

      <!-- POST PREFERENCES MODAL -->
      <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
        <Modal :data="data">
          <div class="vote">
            {{data.content}}
          </div>
        </Modal>
      </ion-modal>

      <!-- FAB BUTTON -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="scanBarCode()">
          <ion-icon :icon="barcodeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- SEARCH FIELD
      <ion-row>
        <ion-col>
          <ion-searchbar v-model="barcode" enterkeyhint="enter" placeholder="Search product by barcode" inputmode="search" debounce="50" show-cancel-button="focus" @click="getProductbyBarcode()" autocomplete="false" cancel-button-icon search-icon></ion-searchbar>
        </ion-col>
        <ion-col>
          <ion-button @click="getProductbyBarcode()">
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>-->

      <!-- SEARCH -->
      <div class="searchbox">
        <input class="searchbar" type="search" placeholder="search" v-model="barcode">
        <input class="submit" type="submit" v-on:click="getProductbyBarcode()">
      </div>

      <!-- EMPTY SEARCH -->
      <div style="text-align: center; margin-top: 15em" v-if="products == ''">
        <ion-label>product not found?</ion-label>
        <ion-item-divider></ion-item-divider>
        <ion-button @click="openModal()">add to pantry!</ion-button>
      </div>

      <!-- SEARCH CARDS -->
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
            <ion-button color="tertiary" expand="block" @click="addLocal(product)">add to pantry</ion-button>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, modalController, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonButton, IonItemDivider, toastController, IonModal } from '@ionic/vue';
import { barcodeOutline, searchOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import axios from "axios";
import postProductModal from "@/components/modal.vue";
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
//import Modal from './modal.vue';


export default defineComponent ({
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonFab, IonFabButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonButton, IonItemDivider, IonModal },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = { content: 'Votes' };
    return {
      barcodeOutline,
      searchOutline,
      isOpenRef, 
      setOpen, 
      data
    };
  },

  data() {
    return {
      //projectEndpoint: "https://lam21.iot-prism-lab.cs.unibo.it/",
      barcode: '',
      products: null
    };
  },

  beforeMount() {
    axios.get(this.$store.state.projectEndPoint + 'products?barcode=0000000000000', {
      headers: {
        Authorization: this.$store.state.token
      }
    }).then(result => {
      console.log('ok')
    }).catch(error => {
      console.log('nok');
      this.$router.push('/startingpage');
    })
  },

  methods: {
    async openSuccessToast() {
      const toast = await toastController
        .create({
          message: 'Item successfully added to pantry!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

    async openFailToast() {
      const toast = await toastController
        .create({
          message: 'Error',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

    getProductbyBarcode() {
      axios.get(this.$store.state.projectEndPoint + 'products?barcode=' + this.barcode, {
        headers: {
          Authorization: this.$store.state.token
        }
      }).then((result) => {
        this.products = result.data.products;
        this.$store.state.sessiontoken = result.data.token
        //console.log(this.products)
      }).catch(error => {
        console.log(error)
        this.openFailToast();
      })
    },

    votes(rate: string, id: string) {
      const data = {
        token: this.$store.state.sessiontoken,
        rating: rate,
        productId: id
      }
      axios.post(this.$store.state.projectEndPoint + 'votes', data, {
        headers: {
          Authorization: this.$store.state.token
        }
      }).then(result => {
        console.log(result)
      }).catch(error => {
        this.openFailToast();
      })
    },

    async openModal() {
      const modal = await modalController
        .create({
          component: postProductModal,
          componentProps: {
            title: "Add product to your pocket"
          },
        })
      return modal.present();
    },

    addLocal(elem: any[]) {
      const item = elem
      this.$store.commit('addKey', item);
      this.openSuccessToast();
    },

    scanBarCode() {
      //this.$store.state.barcode = this.barcode;
      BarcodeScanner.scan().then(barcodeData => {
        console.log('ok');
        //this.barcode = barcodeData;
      })
    }

  },
})
</script>

<style type="text/css">
input {
  box-sizing: border-box;
  font-size: 13px;
  vertical-align: top;
}

.searchbox {
  text-align: center;
  position: relative;
}

.searchbar {
  padding: 0 30px;
  width: 80%;
  max-width: 400px;
  height: 40px;
  border: 1px solid darken(white, 30%);
  border-radius: 20px 0 0 20px;
}

.submit {
  border: none;
  background: no-repeat center center, #1E1E20;
  background-size: 35px 35px;
  border-radius: 0 20px 20px 0;
  padding: 15px 25px;
  width: 20%;
  height: 40px;
}
</style>
