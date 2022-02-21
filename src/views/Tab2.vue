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

      <!-- SEARCHBOX -->
      <div class="searchbox">
        <input class="searchbar" type="search" placeholder="search" v-model="searchQuery">
      </div>

      <!-- FILTERBOX -->
      <div style="text-align: center;">
        <ion-button @click="searchQuery = 'Fish'" color="dark" size="small">fish</ion-button>
        <ion-button @click="searchQuery = 'Meat'" color="dark" size="small">meat</ion-button>
        <ion-button @click="searchQuery = 'Sides'" color="dark" size="small">sides</ion-button>
        <ion-button @click="searchQuery = 'Home'" color="dark" size="small">home</ion-button>
        <ion-button @click="searchQuery = 'Other'" color="dark" size="small">other</ion-button>
        <ion-button v-if="searchQuery != ''" @click="searchQuery = ''" color="danger" size="small">cancel</ion-button>
      </div>

      <!-- card -->
      <div style="margin-top: 10px" class="card" v-for="(product, index) in resultQuery" :key="index">
        <div v-if="product.barcode != ''">
          <h1 style="margin-bottom: 20px">{{ product.name }}</h1>
          <h6 style="color: grey;">barcode: {{ product.barcode }}</h6>
          <ion-img v-if="product.img" :src="product.img"></ion-img>

          <h3 style="margin-bottom: 30px;">{{ product.description }}</h3>
          <h5>type: {{ product.type }}</h5>
          <h5>rating: {{ product.rating }}</h5>
          <ion-button color="danger" expand="block" @click="removeItem(product.name), deleteEvent(product.name)">Remove to pantry</ion-button>
          <div style="margin-top: 20px;">
            <div style="color: grey;">expiracy: {{ product.expiracy.toString().split('T')[0] }}</div>
          </div>
        </div>
      </div>

      <!-- FAB RELOAD BUTTON -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="dark"  @click="products = [], getItems()">
          <ion-icon :icon="refreshOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { Storage } from '@capacitor/storage';
import { defineComponent } from 'vue';
import axios from "axios";
import { refreshOutline } from 'ionicons/icons';

interface RefresherEventDetail {
  complete(): void;
}
/*
interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}*/

export default defineComponent ({
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonFab, IonFabButton, IonIcon },

  setup() {
    return {
      refreshOutline
    }
  },

  data() {
    const dateNow = new Date();
    return {
      searchQuery: '',
      products: [],
      dateNow
    };
  },

  created() {
    this.getItems();
  },

  beforeMount() {
    /* DEFAULT CALL TO CHECK CREDENTIALS */
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
          if(src !== "" && src !== 'Fish' && src !== 'Meat' && src !== 'Sides' && src !== 'Home' && src !== 'Other'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.name.toLowerCase().includes(v))
            })
          }
          else if (src == 'Fish'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else if (src == 'Meat'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else if (src == 'Sides'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else if (src == 'Home'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else if (src == 'Other'){
            return prod.filter((gg)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else{
            return prod;
          }
        },
      },

  methods: {
    /* CALL AL LOCAL DB TRAMITE VUEX */

    getKeys() {
      this.$store.commit('getKeys');
    },

    addKey() {
      this.$store.commit('addKey');
    },

    /* GET ITEMS IN LOCAL DATABASE */
    async getItems() {
      this.$store.commit('getItems', this.products);
      console.log(this.products)
    },

    clear() {
      this.$store.commit('clearAll');
    },

    /* REMOVE ITEM FROM DATABASE */
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
.card {
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  position: relative;
  margin-bottom: 30px;
}

.cardTitle {
  margin-top: 0;
  margin-bottom: 50px;
}

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
    height: 50px;
  }
</style>