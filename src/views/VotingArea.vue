<template>
  <div class="uk-card uk-card-default uk-width-3-4 uk-card-body uk-dark">
    <div v-if="!voted">
      <h1>Escolha seu candidato</h1>
      <hr>
      <div class="uk-overflow-auto uk-height-medium">
        <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
          <thead>
            <th class="uk-table-shrink">Foto</th>
            <th class="uk-table-expand">Nome</th>
            <th class="uk-table-expand">Turma</th>
            <th class="uk-table-expand">RA</th>
            <th>Botão</th>
          </thead>
          <tbody class="uk-overflow-auto">
            <tr v-for="c of candidate" :key="c.RA">
              <td><img class="uk-preserve-width uk-border-circle" :src="c.URL" width="40" alt=""></td>
              <td>{{ c.fullName }}</td>
              <td>{{ c.Turma }}</td>
              <td>{{ c.RA }}</td>
              <td><button type="button" class="uk-button uk-button-secondary" @click="vote(c.RA)">Votar</button></td>
            </tr>
          </tbody>
        </table>
        <div class="uk-margin uk-flex uk-flex-right@l">
          <button class="uk-button uk-button-secondary" type="button">Logout</button>
        </div>
      </div>
    </div>
    <div class="uk-height-small" v-else>
      <h1>Seu voto já foi computado!</h1>
      <hr>
      <div class="uk-text-center">
        Você já votou e seu voto já foi computado,
        portanto, espere o resultado da votação!
      </div>
      <div class="uk-margin uk-flex uk-flex-right@l">
        <button class="uk-button uk-button-secondary" type="button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../utils/user'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      user: {},
      candidate: [],
      ra: '',
      voted: false
    }
  },
  apollo: {
    candidate: gql`query {
      candidate: allCandidates {
        fullName,
        RA,
        Turma,
        URL
      }
    }`
  },
  async created () { 
    this.user = User.data
    console.log(this.user)

    if (User.data) {
      let vote = await this.getVote(this.user.id)

      if (vote)
        this.voted = true
      else
        this.voted = false
    }
  },
  methods: {
    vote(ra) {
      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $candidateRA: String!,
            $userId: String!
          ) {
            newVote(candidateRA: $candidateRA, userId: $userId) {
              id
            }
          }
        `,
        variables: {
          candidateRA: ra,
          userId: User.data.id
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
        query: gql`query ($RA: String!) {
          fetchUser (RA: $RA) {
            id
          }
        }`,
        variables: {
          RA: User.data.RA
        }
      }).then(data => {
        if (data)
          user = data
      })
      let { data } = user

      return data
    },
    async getVote() {
      let vote
      await this.$apollo.query({
        query: gql`query ($userId: String!) {
          getUserVotes(userId: $userId)  {
            candidateRA
          }
        }`,
        variables: {
          userId: this.user.id
        }
      }).then(data => {
        if (data)
          vote = data
      })

      return vote
    }
  }
}
</script>