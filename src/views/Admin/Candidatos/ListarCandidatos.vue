<template>
    <main>
      <div class="uk-margin uk-flex uk-flex-right@l">
        <router-link to="/admin/candidatos/novo" tag="button" class="uk-button uk-button-secondary">Novo Candidato</router-link>
      </div>
      <div class=" uk-overflow-auto uk-height-medium">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="">Foto</th>
              <th class="">Nome</th>
              <th class="">Registro do Aluno</th>
              <th class="">Turma</th>
              <th class="">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c of candidate" :key="c.RA">
              <td><img class="uk-preserve-width uk-border-circle" :src="c.URL" width="40" alt=""></td>
              <td>{{ c.fullName }}</td>
              <td>{{ c.RA }}</td>
              <td>{{ c.Turma }}</td>
              <td>
                <button class="uk-button uk-button-default">Remover</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      candidate: []
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
  async mounted () {
    await this.getVotes()
  },
  methods: {
    async getVotes() {
      this.$apollo.query({
        query: gql`query ($candidateRA: String!) {
          countCandidateVotes (candidateRA: $candidateRA) {
            id
          }
        }`,
        variables: {
          candidateRA: '124910238'
        }
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>
