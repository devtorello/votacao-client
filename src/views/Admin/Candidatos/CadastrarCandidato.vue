<template>
  <form>
    <div uk-grid class="uk-child-width-1-2">
      <div>
        <legend class="uk-legend">Cadastrar Candidato</legend>
        <div class="uk-margin">
          <label class="uk-form-label">Nome</label>
          <input type="text" class="uk-input" v-model="nome">
        </div>

        <div class="uk-margin">
          <form class="uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
              <label class="uk-form-label">RA</label>
              <input type="text" class="uk-input" v-model="RA">
            </div>
            <div class="uk-width-1-2@s">
              <label class="uk-form-label">Turma</label>
              <input type="text" class="uk-input" v-model="turma">
            </div>
          </form>
        </div>

        <div class="uk-margin">
          <label class="uk-form-label">URL da Foto</label>
          <input type="text" class="uk-input" v-model="URL">
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-secondary" type="button" @click="createCandidate">Cadastrar</button>
          <router-link tag="button" to="/admin/candidatos" class="uk-button uk-button-text uk-margin-left">Cancelar</router-link>
        </div>
      </div>
      <div>
        <img class="uk-width-1-1" :src="URL ? URL : 'https://placehold.it/400x300'" uk-img>
      </div>
    </div>

  </form>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      nome: '',
      RA: '',
      turma: '',
      URL: ''
    }
  },
  methods: {
    createCandidate() {
      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $fullName: String!,
            $RA: String!,
            $Turma: String!,
            $URL: String!
          ) {
              createCandidate(fullName: $fullName, RA: $RA, Turma: $Turma, URL: $URL) {
                RA
            }
          }
        `,
        variables: {
          fullName: this.nome,
          RA: this.RA,
          Turma: this.turma,
          URL: this.URL
        }
      })
    }
  }
}
</script>
