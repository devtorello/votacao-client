<template>
    <main>
      <div uk-grid class="uk-margin">
        <div class="uk-width-1-3">
          <img :src="winner.URL" class="uk-width-1-1" uk-img>
        </div>
        <div class="uk-width-2-3">
          <h2>O vencedor é <b class="uk-text-secondary">{{ winner.fullName }}</b></h2>
          <h4 style="margin: 0px" class="">O candidato {{ winner.fullName }}, venceu a eleição com um total de {{ winner.count }} votos.</h4>
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
            <tr v-for="c of candidates" :key="c.RA">
              <td>{{ c.fullName }}</td>
              <td>{{ c.RA }}</td>
              <td>{{ c.Turma }}</td>
              <td>{{ c.count }}</td>
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
      candidate: [],
      votes: [],
      candidates: {},
      winner: {}
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
    this.countVotes()
    this.wins()
  },
  methods: {
    countVotes() {
      this.candidates = {}

      for (let c of this.candidate) {
        let count = 0
        for (let v of this.votes) {
          if (c.RA === v.candidateRA)
            count++
        }

        this.candidates[c.RA] = c
        this.candidates[c.RA].count = count

        count = 0
      }
    },
    wins() {
      const candidateList = Object.values(this.candidates)
      const winner = candidateList.reduce((p, c) => c.count > p.count ? c : p)
      this.winner = winner
    }
  }
}
</script>
