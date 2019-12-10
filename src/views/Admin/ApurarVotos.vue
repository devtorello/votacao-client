<template>
    <main>
      <div uk-grid class="uk-margin">
        <div class="uk-width-1-3">
          <img src="https://placehold.it/400x300" class="uk-width-1-1" uk-img>
        </div>
        <div class="uk-width-2-3">
          <h2>O vencedor é <b class="uk-text-secondary">Murilo Pereti Tavares</b></h2>
          <h4 style="margin: 0px" class="">O candidato Murilo Pereti Tavares, venceu a eleição com um total de 66 votos, representando 74% dos votos.</h4>
        </div>
      </div>
      <div class=" uk-overflow-auto uk-height-small">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="">Nome do Candidato</th>
              <th class="">RA</th>
              <th class="">Turma</th>
              <th class="">Total de Votos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c of candidate" :key="c.RA">
              <td>{{ c.fullName }}</td>
              <td>{{ c.RA }}</td>
              <td>{{ c.Turma }}</td>
              <td>66</td>
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
  }
}
</script>
