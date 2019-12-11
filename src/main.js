/* eslint-disable */
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import { router } from './router'
import App from './App.vue'
import Vue from 'vue'
import * as UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import './assets/scss/app.scss'
import { ApolloLink, concat } from 'apollo-link'

import Auth from './utils/auth'

UIkit.use(Icons)

Vue.config.productionTip = false

const main = async () => {

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000' 
  })

  const authMid = new ApolloLink((operation, foward) => {
    const token = Auth.get()

    if (!token)
      return foward(operation)

    operation.setContext({
      headers: {
        authorization: token !== null ? `Bearer ${token}` : null
      }
    })

    return foward(operation)
  })

  let LinkApollo = ''

  if (token === null)
    LinkApollo = httpLink
  else
    LinkApollo = concat(authMid, httpLink)

  const apolloClient = new ApolloClient({
    link: LinkApollo,
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
