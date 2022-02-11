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

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="searchbox">
        <input class="searchbar" type="search" placeholder="search" v-model="searchQuery">
      </div>

      <ion-card v-for="(product, index) in resultQuery" :key="index">
        <div v-if="product.barcode != ''">
          <ion-card-header>
            <ion-card-title style="text-align: center;">{{ product.name }}</ion-card-title>
            <ion-card-subtitle>barcode: {{ product.barcode }}</ion-card-subtitle>
            <ion-img v-if="product.img" :src="product.img"></ion-img>
          </ion-card-header>
          <ion-card-content>
            <ion-item>{{ product.description }}</ion-item>
            <ion-button color="danger" expand="block" @click="removeItem(product.name), deleteEvent(product.name)">Remove to pantry</ion-button>
            <ion-item>
              <ion-label>created: {{ product.createdAt }}</ion-label>
              <ion-label>updated: {{ product.updatedAt }}</ion-label>
            </ion-item>
          </ion-card-content>
        </div>
      </ion-card>

<!--
      <button @click="getKeys()">get</button>
      <button @click="addKey()">add</button>
      <button @click="getItems()">getall</button>
      <button @click="clear()">clear</button>
-->
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton, IonLabel, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { Storage } from '@capacitor/storage';
import { defineComponent } from 'vue';
import axios from "axios";

interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}

export default defineComponent ({
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton, IonLabel, IonRefresher, IonRefresherContent },

  setup() {
    /*
    const doRefresh = (event: CustomEvent) => {
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
    */
    return {
      //doRefresh
    }
  },

  data() {
    return {
      searchQuery: '',
      products: []
    };
  },

  created() {
    this.getItems();
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

  computed: {
        //Funzione per la ricerca della searchbar e per i filtri della filterbar
        resultQuery(){
          const prod: any[] = this.products;
          const src: string = this.searchQuery;
          if(src !== ""){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.name.toLowerCase().includes(v))
            })
          }
          /*
          else if (this.searchQuery == "Nuovo"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.stato.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Playstation 5"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Playstation 4"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Nintendo"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Pc"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Xbox One"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "Xbox Serie X/S"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.platform.toLowerCase().includes(v))
            })
          }
          else if (this.searchQuery == "true"){
            return this.items.filter((gg)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => gg.disponibile.toLowerCase().includes(v))
            })
          }*/
          else{
            return prod;
          }
        },
      },

  methods: {
    getKeys() {
      this.$store.commit('getKeys');
    },

    addKey() {
      this.$store.commit('addKey');
    },

    async getItems() {
      this.$store.commit('getItems', this.products);
    },

    clear() {
      this.$store.commit('clearAll');
    },

    removeItem(item: string) {
      this.$store.commit('removeItem', item);
    },

    deleteEvent(item: never) {
      this.products.splice(this.products.indexOf(item), 1);
    }
  },
})
</script>

<style type="text/css">
  .searchbox {
    margin: 10px;
  }

  .searchbar {
    box-sizing: border-box;
    text-align: center;
    position: relative;
    vertical-align: top;
    width: 100%;
    padding: 10px;
    border: 1px solid dark;
    border-radius: 20px;
  }
</style>