<template>
    <main>
      <div uk-grid class="uk-margin">
        <div class="uk-width-1-3">
          <img :src="winner.URL" class="uk-width-1-1" uk-img>
        </div>
        <div class="uk-width-2-3">
          <h2>O vencedor é <b class="uk-text-primary">{{ winner.fullName }}</b></h2>
          <p class="uk-text-lead">O candidato {{ winner.fullName }}, venceu a eleição com um total de {{ winner.count }} votos.</p>
        </div>
      </div>
      <div class=" uk-overflow-auto uk-height-medium">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="">Nome do Candidato</th>
              <th class="">CPF</th>
              <th class="">Total de Votos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in candidates" :key="c.CPF">
              <td>{{ c.fullName }}</td>
              <td>{{ c.CPF }}</td>
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
  mounted () {
    this.$apollo.queries.candidate.refetch()
    this.$apollo.queries.votes.refetch()

    this.countVotes()
    this.wins()
  },
  methods: {
    countVotes() {
      this.candidates = {}

      for (let c of this.candidate) {
        let count = 0
        for (let v of this.votes) {
          if (c.CPF === v.CPF)
            count++
        }

        this.candidates[c.CPF] = c
        this.candidates[c.CPF].count = count

        count = 0
      }
    },
    wins() {
      const candidateList = Object.keys(this.candidates).map(i => this.candidates[i])
      let prevVal = 0

      for (let c of candidateList) {
        if (c.count > prevVal) {
          prevVal = c.count
          this.winner = c
        }
      }
    }
  }
}
</script>