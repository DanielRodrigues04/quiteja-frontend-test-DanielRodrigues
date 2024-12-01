import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ** Importar Vuetify e seus estilos **
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// ** Importar o Axios **
import axios from 'axios'

// ** Usar Vuetify no Vue **
Vue.use(Vuetify)

Vue.config.productionTip = false

// ** Configuração Global do Axios **
Vue.prototype.$axios = axios; // Agora você pode usar `this.$axios` em qualquer componente

new Vue({
  router,
  store,
  vuetify: new Vuetify(), // ** Adicionar o Vuetify aqui **
  render: h => h(App)
}).$mount('#app')
