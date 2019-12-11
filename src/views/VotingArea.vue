<template>
  <div class="uk-card uk-card-default uk-width-3-4 uk-card-body uk-dark">
    <div v-if="voted === false">
      <div uk-grid>
        <div class="uk-width-expand">
          <h1>Escolha seu candidato</h1>
        </div>
        <div>
          <button class="uk-button uk-button-secondary" type="button" @click="logout">Logout</button>
        </div>
      </div>
      <hr>
      <div class="uk-child-width-1-3@m uk-overflow-auto uk-height-large uk-padding-small" uk-grid>
        <template v-if="candidate.length > 0">
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
        </template>
        <div v-else>
          <h1>Não há nenhum candidato para votar!</h1>
        </div>
      </div>
    </div>
    <div class="uk-height-small" v-else>
      <div uk-grid>
        <div class="uk-width-expand">
          <h1>Seu voto já foi computado!</h1>
        </div>
        <div>
          <button class="uk-button uk-button-secondary" type="button" @click="logout">Logout</button>
        </div>
      </div>
      <hr>
      <div class="uk-text-center">
        Você já votou e seu voto já foi computado,
        portanto, espere o resultado da votação!
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
  async mounted () {
    await this.$apollo.queries.vote.refetch()
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
          this.voted = true
      }).catch(error => {
        alert(error)
      })
    },
    logout() {
      User.clear()
      Auth.remove()
      this.$router.push('/')
    }
  }
}
</script>