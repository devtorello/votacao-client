<template>
  <div>
    <div class="uk-margin-medium uk-child-width-1-2@m" uk-grid>
      <div>
        <div class="uk-card uk-card-body uk-card-default uk-dark uk-flex uk-flex-middle uk-flex-center uk-flex-column">
          <h1>{{ votes.length }}</h1>
          <p class="uk-text-lead">Votos</p>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-body uk-card-default uk-dark uk-flex uk-flex-middle uk-flex-center uk-flex-column">
          <h1>{{ candidate.length }}</h1>
          <p class="uk-text-lead">Candidatos</p>
        </div>
      </div>
    </div>
    <div class="uk-margin uk-flex uk-flex-right@l">
      <button class="uk-button uk-button-secondary" type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Auth from '../../utils/auth'
import User from '../../utils/user'

export default {
  data() {
    return {
      votes: [],
      candidate: []
    }
  },
  apollo: {
    votes: gql`query {
      votes: allVotes {
        id
        candidateRA
        userId  
      }
    }`,
    candidate: gql`query {
      candidate: allCandidates {
        fullName,
        RA,
        Turma,
        URL
      }
    }`
  },
  methods: {
    logout() {
      User.clear
      Auth.remove()
      this.$router.push('/')
    }
  }
}
</script>