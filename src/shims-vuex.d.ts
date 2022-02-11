import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    count: number,
    token: '',
    projectEndPoint: 'https://lam21.iot-prism-lab.cs.unibo.it/',
    sessiontoken: ''
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}