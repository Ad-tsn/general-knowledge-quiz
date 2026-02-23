import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import { setPersistence, browserSessionPersistence } from 'firebase/auth'

setPersistence(auth, browserSessionPersistence)
  .catch((err) => {
    console.error('Erreur persistance Firebase:', err)
  })

const app = createApp(App)
app.use(router)
app.mount('#app')

