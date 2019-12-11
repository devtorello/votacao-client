<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwtdecode from 'jwt-decode'
import Auth from './utils/auth'
import gql from 'graphql-tag'
import User from './utils/user'

export default {
  name: 'app',
  data() {
    return {
      token: '',
      decoded: '',
      user: {}
    }
  },
  async created () {
    await this.initAuth()
    
    if (this.user && Auth.isLoggedIn) {
      if (this.user.level === 'ADMIN')
        this.$router.push('/admin')
      else
        this.$router.push(`/vote`)
    } else if (Auth.isGuest) {
      this.$router.push('/')
    }
  },
  methods: {
    async initAuth () {
      Auth.initialize()

      if (Auth.state.token)
        this.token = Auth.state.token
      else
        this.token = Auth.get()

      let decoded = jwtdecode(this.token)

      if (decoded) {
        await this.$apollo.query({
          query: gql`query ($CPF: String!) {
            fetchUser (CPF: $CPF) {
              id,
              firstName,
              lastName,
              CPF,
              level
            }
          }`,
          variables: {
            CPF: decoded.CPF
          }
        }).then(data => {
          let { data: user } = data

          User.load(user.fetchUser)
        })
      }

      this.user = User.data
    }
  }
}
</script>