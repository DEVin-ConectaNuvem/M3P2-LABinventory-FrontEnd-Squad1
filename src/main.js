import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGravatar from 'vue3-gravatar'
import VueTheMask from 'vue-the-mask'
import Toast from 'vue-toastification'
import MDialogPlugin from 'vue-m-dialog'
import 'vue-m-dialog/dist/style.css'
import 'vue-toastification/dist/index.css'
import './validators/validators'
import 'animate.css'

const app = createApp(App)

app.directive('focus', {
  mounted: el => el.focus()
})
app.use(MDialogPlugin)
app.use(router)
app.use(store)
app.use(Toast, {
  shareAppContext: true,
  maxToasts: 5
})
app.use(VueGravatar)
app.use(VueTheMask)

app.mount('#app')
