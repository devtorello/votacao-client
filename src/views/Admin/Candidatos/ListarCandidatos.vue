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
          <tbody v-if="candidate.length > 0">
            <tr v-for="c of candidate" :key="c.RA">
              <td><img class="uk-preserve-width uk-border-circle" :src="c.URL" width="40" alt=""></td>
              <td>{{ c.fullName }}</td>
              <td>{{ c.RA }}</td>
              <td>{{ c.Turma }}</td>
              <td>
                <button class="uk-button uk-button-default" type="button" @click="remove(c.id)">Remover</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5">Não há nenhum candidato cadastrado!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    candidate: gql`query {
      candidate: allCandidates {
        id,
        fullName,
        RA,
        Turma,
        URL
      }
    }`,
    votes: gql`query {
      votes: allVotes {
        id
        candidateRA
        userId  
      }
    }`,
  },
  mounted () {
    this.$apollo.queries.candidate.refetch()
    this.$apollo.queries.votes.refetch()
  },
  methods: {
    remove(item) {
      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $id: String!
          ) {
              deleteCandidate (id: $id) {
                id
            }
          }
        `,
        variables: {
          id: item
        }
      }).then(() => {
        alert('Usuário excluído!')
        this.$apollo.queries.candidate.refetch()
      })
    }
  }
}
</script>
