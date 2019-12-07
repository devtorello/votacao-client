/* eslint-disable */
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import { router } from './router'
import App from './App.vue'
import Vue from 'vue'

import './assets/scss/app.scss'

Vue.config.productionTip = false

const main = async () => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'endpoint' }),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
  
  Vue.use(VueApollo)
  Vue.use(VueRouter)

  const vuerouter = new VueRouter(router)
  
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: 'loading'
    }
  })

  const app = new Vue({
    apolloProvider,
    render: h => h(App),
    router: vuerouter
  })

  app.$mount('#app')
}

main().catch(console.error)
