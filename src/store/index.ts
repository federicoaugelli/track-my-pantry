import { createStore } from 'vuex';
import { Storage } from '@ionic/storage';

const ionicStorage = new Storage();
ionicStorage.create();

export default createStore({
  state: {
    token: '',
    projectEndPoint: 'https://lam21.iot-prism-lab.cs.unibo.it/',
    sessiontoken: '',
    barcode: '',
    //items: []
  },
  getters: {
  },
  mutations: {
    updataa(state, tok) {
      state.sessiontoken = tok;
    },

    async getKeys() {
      ionicStorage.keys()
        .then(result => {
          console.log(result);
        })
    },

    async getItems(state, elem) {
      ionicStorage.forEach((key, value, index) => {
        console.log(key);
        elem.push(key);
      })
    },

    addKey(state, elem) {
      const payload = {
        id: elem.id,
        name: elem.name,
        description: elem.description,
        barcode: elem.barcode,
        userId: elem.userId,
        test: true,
        createdAt: elem.createdAt,
        updatedAt: elem.updatedAt
      }
      ionicStorage.set(elem.name, payload);
    },

    clearAll() {
      ionicStorage.clear();
    },

    removeItem(state, key) {
      ionicStorage.remove(key);
    }
  },
  actions: {
  },
  modules: {
  }
})
