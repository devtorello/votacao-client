<template>
  <div class="uk-card uk-card-primary uk-width-3-4 uk-card-body uk-dark">
    <h1>Escolha seu candidato</h1>
    <hr>
    <div class="uk-child-width-1-3@m uk-overflow-auto uk-height-large uk-padding-small" uk-grid>
      <div v-for="c in candidate" :key="c.CPF">
        <div class="uk-card uk-card-primary ">
            <div class="uk-card-media-top">
              <img :src="c.URL" class="uk-width-1-1" uk-img>
            </div>
            <div class="uk-card-body">
                <h3>{{ c.fullName }}</h3>
                <a class="uk-button uk-button-default" @click="voteNow(c.CPF)">Votar</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../utils/user'
import gql from 'graphql-tag'
import Auth from '../utils/auth'

export default {
  data() {
    return {
      user: {},
      candidate: [],
      cpf: '',
      voted: false,
      vote: {}
    }
  },
  apollo: {
    candidate: gql`query {
      candidate: allCandidates {
        fullName,
        CPF,
        Apartamento,
        URL
      }
    }`,
    vote: gql`query {
      vote: getUserVotes {
        CPF
      }
    }`
  },
  async created () {
    this.user = User.data
    
    if (this.vote.CPF != null)
      this.voted = true
    else
      this.voted = false
  },
  methods: {
    voteNow(cpf) {
      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $CPF: String!
          ) {
            newVote(CPF: $CPF) {
              id
            }
          }
        `,
        variables: {
          CPF: cpf
        }
      }).then(data => {
        if (data)
          alert('Voto computado!')
      }).catch(error => {
        alert(error)
      })
    },
    async getUser() {
      let user 
      await this.$apollo.query({
        query: gql`query ($CPF: String!) {
          fetchUser (CPF: $CPF) {
            id
          }
        }`,
        variables: {
          CPF: User.data.CPF
        }
      }).then(data => {
        if (data)
          user = data
      })
      let { data } = user

      return data
    },
    logout() {
      Auth.remove()
      this.$router.push('/')
    }
  }
}
</script>