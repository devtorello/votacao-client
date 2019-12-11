<template>
    <main>
      <div class="uk-margin">
        <router-link to="/admin/candidatos/novo" tag="button" class="uk-button uk-button-primary">Novo Candidato</router-link>
      </div>
      <div class=" uk-overflow-auto uk-height-large">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="">Nome</th>
              <th class="">CPF</th>
              <th class="">Apartamento</th>
              <th class="">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in candidate" :key="c.CPF">
              <td>{{ c.fullName }}</td>
              <td>{{ c.CPF }}</td>
              <td>{{ c.Apartamento}}</td>
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
        CPF,
        Apartamento,
        URL
      }
    }`,
    votes: gql`query {
      votes: allVotes {
        id
        CPF
        userId  
      }
    }`,
  },
  async mounted () {
  },
  methods: {
  }
}
</script>
