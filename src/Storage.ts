import { Storage } from '@ionic/storage'

export default async function storageFactory(wsBaseUrl: string) {

  const storage = new Storage();
  // create storage
  const storageInstance = await storage.create();

  // my custom stuff here ...

  // in the end, return the plugin installer
  return {
    install(app: any){
      app.config.globalProperties.$ionicStorage = storageInstance;
      // special copy for vuex storage
      app.config.globalProperties.$store.$ionicStorage = storageInstance; 
    }
  }
}