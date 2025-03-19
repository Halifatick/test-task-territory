import { createApp } from 'vue'

import '@/styles/app.scss'

import App from '@/App.vue'
import router from '@/router/index.js'
import { PiniaPlugin } from '@/plugins/pinia.plugin.js'
import { LoggerPlugin } from '@/plugins/logger.plugin.js'

const app = createApp(App)

app.use(router)
app.use(PiniaPlugin)
app.use(LoggerPlugin)

app.mount('#app')
