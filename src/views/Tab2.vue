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

      <!-- VOTES MODAL -->
      <ion-modal
        :is-open="isOpenRef" :swipe-to-close="true" @didDismiss="setOpen(false)">
        <Modal :data="data">
          <ion-toolbar>
          </ion-toolbar>
          <ion-card>
            <ion-card-header>
              <ion-card-title size="large">Vote {{ modalProduct.name }}</ion-card-title>
              <div style="margin: 25px"></div>
              <ion-card-subtitle>barcode: {{ modalProduct.barcode }}</ion-card-subtitle>
              <ion-card-title>description: {{ modalProduct.description }}</ion-card-title>
                <ion-text>
                  <h4>rating: </h4>
                </ion-text>
                <ion-input type="number" inputmode="numeric" max="5" min="1" enterkeyhint="submit" v-model="vote"></ion-input>
                <ion-button expand="block" color="dark" @click="votes(vote, modalProduct)">vote</ion-button>
            </ion-card-header>
          </ion-card>
        </Modal>
      </ion-modal>

      <!-- SEARCHBOX -->
      <div class="searchbox">
        <input v-if="searchQuery.includes('filter: ')" class="searchbar" type="disabled" placeholder="search" disabled>
        <input v-else class="searchbar" type="search" placeholder="search" v-model="searchQuery">
      </div>

      <!-- FILTERBOX -->
      <div style="overflow: scroll; text-overflow: ellipsis; white-space: nowrap; text-align: center;">
            <ion-button v-if="searchQuery != ''" @click="searchQuery = ''" color="danger" size="small"><ion-icon :icon="closeOutline" /></ion-button>

            <!-- Computed? -->
            <ion-button v-for="(item, index) in filteredFilter" :key="index" @click="searchQuery = 'filter: ' + item.type" color="dark" size="small">{{ item.type }}</ion-button>
      </div>

      <!-- card -->
      <div v-for="(product, index) in resultQuery" :key="index">
      <div style="margin-top: 10px" class="card" v-if="product.barcode != '' && product.user == this.$store.state.currentUser">
        <div>
          <h1 style="margin-bottom: 20px">{{ product.name }}<h2 v-if="Date.parse(product.expiracy.toString().split('T')[0]) < Date.parse(dateNow)" style="color: red">Expired</h2></h1>
          <h6 style="color: grey;">barcode: {{ product.barcode }}</h6>
          <ion-img v-if="product.img" :src="product.img"></ion-img>

          <h3 style="margin-bottom: 30px;">{{ product.description }}</h3>
          <h5>type: {{ product.type }}</h5>
          <h5 v-if="product.rating != ''">rating: {{ product.rating }}</h5>
          <ion-row>
            <ion-col>
              <ion-button  color="danger" expand="block" @click="removeItem(product.name); deleteEvent(product.name)">Remove</ion-button>
            </ion-col>
            <ion-col v-if="product.rating == ''">
              <ion-button expand="block" color="dark" @click="modalProduct = product; setOpen(true)">Vote</ion-button>
            </ion-col>
            <ion-col>
              <ion-button color="success" expand="block" @click="openMap(product.latitude, product.longitude)">open map</ion-button>
            </ion-col>
          </ion-row>
          <div style="margin-top: 20px;">
            <div style="color: grey;">expiracy: {{ product.expiracy.toString().split('T')[0] }}</div>
          </div>
        </div>
      </div>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonModal, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, toastController, IonInput } from '@ionic/vue';
import { Storage } from '@capacitor/storage';
import { defineComponent, ref } from 'vue';
import axios from "axios";
import { refreshOutline, closeOutline } from 'ionicons/icons';

interface RefresherEventDetail {
  complete(): void;
}

export default defineComponent ({
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonModal, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonInput },

  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = { content: 'New Content' };
    return {
      isOpenRef,
      setOpen,
      data,
      refreshOutline,
      closeOutline
    };
  },

  data() {
    const dateNow = '';
    const filters: any[] = [];
    const products: any[] = [];
    const modalProduct: any[] = [];
    const vote = 0;
    return {
      searchQuery: '',
      products,
      filters,
      dateNow,
      modalProduct,
      vote
    };
  },

  created() {
    this.getItems();

    //set current time
    const date = new Date();
    this.dateNow = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    console.log(date.getTime())

    //setInterval(this.getItems, 10000);
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
          this.$forceUpdate();
          console.log(this.$store.state.localItems.length)
          /*
          let prod: any[] = this.$store.state.localItems;
          if (prod != this.$store.state.localItems){
            prod = this.$store.state.localItems;
          }*/
          let src: string = this.searchQuery;
          if(src !== "" && src.indexOf("filter: ") === -1){
            return this.$store.state.localItems.filter((gg: any)=>{
              return src.toLowerCase().split(' ').every(v => gg.name.toLowerCase().includes(v))
            })
          }
          else if (src.includes('filter: ')){
            src = src.replace('filter: ','')
            return this.$store.state.localItems.filter((gg: any)=>{
              return src.toLowerCase().split(' ').every(v => gg.type.toLowerCase().includes(v))
            })
          }
          else{
            return this.$store.state.localItems;
          }
        },

        //computed filters for single user
        filteredFilter(){
          let fil: any[] = this.$store.state.localItems

          const cleaned: any[] = [];
          fil.forEach(function(itm) {
            let unique = true;
            cleaned.forEach(function(itm2) {
            if (itm.type == itm2.type) unique = false;
            });
            if (unique)  cleaned.push(itm);
          });
          fil = cleaned;

          return fil.filter(btn => {
            return btn.user.toLowerCase().includes(this.$store.state.currentUser);
          })
        }
      },

  methods: {

    async openSuccessVote() {
      const toast = await toastController
        .create({
          message: 'Operation performed successfully!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

    async openFailToast(error: string) {
      const toast = await toastController
        .create({
          message: error,
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

    openMap(lat: number, long: number){
      console.log(lat + ', ' + long)
      //window.location.href = 'maps://maps.apple.com/?11=' + long + ', ' + lat;
    },


    /* CALL AL LOCAL DB TRAMITE VUEX */

    getKeys() {
      this.$store.commit('getKeys');
    },

    addKey() {
      this.$store.commit('addKey');
    },

    /* GET ITEMS IN LOCAL DATABASE */
    async getItems() {
      //this.products = [];
      this.$store.commit('getItems', this.products);
      this.$store.state.localItems = this.products;
      //this.$store.state.localItems.push(this.products); //is not a function???
      console.log('siui' + this.$store.state.localItems);
      console.log('siui' + this.products)
    },

    clear() {
      this.$store.commit('clearAll');
    },

    /* REMOVE ITEM FROM DATABASE */
    removeItem(item: string) {
      this.$store.commit('removeItem', item);
      //this.$store.state.localItems.splice(this.$store.state.localItems.indexOf(item), 1);
      //console.log(this.$store.state.localItems.indexOf(item))
    },

    deleteEvent(item: never) {
      let pos = 0;
      for(let i = 0; i < this.$store.state.localItems.length; i++){
        if(this.$store.state.localItems[i].name == item){
          pos = i;
        }
      }
      this.$store.state.localItems.splice(pos, 1);
    },

    votes(rate: string, obj: any) {
      const data = {
        token: this.$store.state.sessiontoken,
        rating: Number(this.vote),
        productId: obj.id
      }

      for(let i = 0; i < this.$store.state.localItems.length; i++){
        console.log(this.$store.state.localItems[i])
      } 
      console.log('rating: ' + this.vote + ' id: ' + obj.id + ' token: ' + this.$store.state.sessiontoken);

      axios.post(this.$store.state.projectEndPoint + "votes", data, {
        headers: {
          Authorization: this.$store.state.token
        }
      }).then(result => {
        obj.rating = this.vote;
        this.$store.commit('addKey', obj);
        for(let i = 0; i < this.$store.state.localItems.length; i++){
          if (this.$store.state.localItems[i] == obj.name){
            this.$store.state.localItems[i].rating = this.vote;
            console.log(this.$store.state.localItems[i].rating);
          }
        }
        this.openSuccessVote()
        this.setOpen(false)
        this.vote = 0;
      }).catch(error => {
        console.log("error: " + error)
        this.openFailToast(error);
      })
    },
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