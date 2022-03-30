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

      <!-- POST PREFERENCES MODAL -->
      <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
        <Modal :data="data">
            <div class="modalItem">
              <h1 class="cardTitle">{{ modalProduct.name }}</h1>
              <ion-text>
                <h4>Barcode: {{ modalProduct.barcode }}</h4>
              </ion-text>
              <ion-text>
                <h3>Description: {{ modalProduct.description }}</h3>
              </ion-text>
              <div>
                <ion-text>
                  <h4>rating: </h4>
                </ion-text>
                <ion-input type="number" inputmode="numeric" max="5" min="0" enterkeyhint="submit" v-model="vote"></ion-input>

                <ion-item>
                  <ion-label>type</ion-label>
                  <ion-select value="other" ok-text="Okay" cancel-text="Dismiss" v-model="type">
                    <ion-select-option value="Fish">Fish</ion-select-option>
                    <ion-select-option value="Meat">Meat</ion-select-option>
                    <ion-select-option value="Sides">Sides</ion-select-option>
                    <ion-select-option value="Home">Home</ion-select-option>
                    <ion-select-option value="Other">Other</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-text>
                  <h4>expiracy: </h4>
                </ion-text>
                <ion-datetime v-model="expdate" presentation="date"></ion-datetime>
              </div>

              <ion-item-divider></ion-item-divider>
              <!--
              <ion-button style="text-align: center;" size="medium" color="secondary" @click="votes(vote, modalProduct.id)">Vote</ion-button>-->
              <ion-button style="text-align: center;" size="medium" color="success" @click="votes(vote, modalProduct.id)">Add to Pantry</ion-button>
            </div>
        </Modal>
      </ion-modal>

      <!-- SEARCH -->
      <div class="searchBarcode" style="margin-bottom: 30px;">
        <input class="search" type="search" placeholder="search" v-model="barcode">
        <input class="submit" type="submit" v-on:click="getProductbyBarcode()">
      </div>

      <!-- EMPTY SEARCH -->
      <div style="text-align: center; margin-top: 15em" v-if="products == ''">
        <ion-label>product not found?</ion-label>
        <div style="height: 30px;"></div>
        <ion-button @click="openModal()">add to pantry!</ion-button>
      </div>

      <!-- SEARCH CARDS -->
      <div style="margin-top: 10px" class="card" v-for="product in products" :key="product.id">
        <div v-if="product.barcode != ''">
          <h1 style="margin-bottom: 20px">{{ product.name }}</h1>
          <h6 style="color: grey;">barcode: {{ product.barcode }}</h6>
          <ion-img v-if="product.img" :src="product.img"></ion-img>

          <h3 style="margin-bottom: 30px;">{{ product.description }}</h3>
          <ion-button color="secondary" expand="block" @click="setOpen(true), modalProduct = product">add to pantry</ion-button>
          <div style="margin-top: 20px;">
            <div style="color: grey;">created: {{ product.createdAt.toString().split('T')[0] }}</div>
            <div style="color: grey;">updated: {{ product.updatedAt.toString().split('T')[0] }}</div>
          </div>
        </div>
      </div>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, modalController, IonLabel, IonItem, IonButton, IonItemDivider, toastController, IonModal, IonDatetime, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { barcodeOutline, searchOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import axios from "axios";
import postProductModal from "@/components/modal.vue";
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
//import Modal from './modal.vue';


export default defineComponent ({
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel, IonItem, IonButton, IonItemDivider, IonModal, IonDatetime, IonInput, IonSelect, IonSelectOption },
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
      products: null,
      modalProduct: [],
      vote: '',
      showVote: true,
      type: '',
      expdate: ''
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
    /* TOASTS */
    async openSuccessToast() {
      const toast = await toastController
        .create({
          message: 'Item successfully added to pantry!',
          duration: 2000,
          position: "top"
        })
      return toast.present();
    },

    async openSuccessVote() {
      const toast = await toastController
        .create({
          message: 'Operation performed successfully!',
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

    /* GET PRODUCTS BY BARCODE */
    getProductbyBarcode() {
      axios.get(this.$store.state.projectEndPoint + 'products?barcode=' + this.barcode, {
        headers: {
          Authorization: this.$store.state.token
        }
      }).then((result) => {
        this.products = result.data.products;
        this.$store.state.sessiontoken = result.data.token
        console.log(this.$store.state.sessiontoken)
      }).catch(error => {
        console.log(error)
        this.openFailToast();
      })
    },

    /* POST PRODUCT PREFERENCES */
    votes(rate: string, id: string) {
      const data = {
        token: this.$store.state.sessiontoken,
        rating: Number(rate),
        productId: id
      }
      axios.post(this.$store.state.projectEndPoint + "votes", data, {
        headers: {
          Authorization: this.$store.state.token
        }
      }).then(result => {
        this.setOpen(false)
        this.openSuccessVote()
        this.addLocal(this.modalProduct, this.type, this.vote)
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

    /* ADD TO LOCAL DATABASE */
    addLocal(elem: any, type: string, vote: string) {
      console.log(vote);
      console.log(type);
      const item = {
        id: elem.id,
        name: elem.name,
        description: elem.description,
        barcode: elem.barcode,
        userId: elem.userId,
        test: false,
        createdAt: elem.createdAt,
        updatedAt: elem.updatedAt,
        rating: vote,
        type: type,
        expiracy: this.expdate
      }

      this.$store.commit('addKey', item);
      this.openSuccessToast();
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

.modalItem {
  border: 2px solid white;
  border-radius: 10px;
  padding: 30px;
  margin: 30px;
  text-align: center;
  position: relative;
  top: 5%;
}

input {
  box-sizing: border-box;
  font-size: 13px;
  vertical-align: top;
}

.searchBarcode {
  text-align: center;
  position: relative;
  margin: 10px;
}

.search {
  padding: 0 30px;
  width: 65%;
  max-width: 400px;
  height: 50px;
  border: 1px solid darken(white, 30%);
  border-radius: 20px 0 0 20px;
}

.submit {
  border: none;
  background: no-repeat center center, #1E1E20;
  background-size: 35px 35px;
  border-radius: 0 20px 20px 0;
  padding: 15px 25px;
  width: 35%;
  height: 50px;
}
</style>
