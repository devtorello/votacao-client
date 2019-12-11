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
              <label class="uk-form-label">CPF</label>
              <input type="text" class="uk-input" v-model="CPF">
            </div>
            <div class="uk-width-1-2@s">
              <label class="uk-form-label">Apartamento</label>
              <input type="text" class="uk-input" v-model="apartamento">
            </div>
          </form>
        </div>
  
        <div class="uk-margin">
          <label class="uk-form-label">URL da Foto</label>
          <input type="text" class="uk-input" v-model="URL">
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-primary" @click="createCandidate">Cadastrar</button>
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
      CPF: '',
      apartamento: '',
      URL: ''
    }
  },
  methods: {
    createCandidate() {
      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $fullName: String!,
            $CPF: String!,
            $Apartamento: String!,
            $URL: String!
          ) {
              createCandidate(fullName: $fullName, CPF: $CPF, Apartamento: $Apartamento, URL: $URL) {
                CPF
            }
          }
        `,
        variables: {
          fullName: this.nome,
          CPF: this.CPF,
          Apartamento: this.apartamento,
          URL: this.URL
        }
      }).then(data => {
        if (data) 
          this.nome = ''
          this.CPF = ''
          this.apartamento = ''
          this.URL = ''

          this.$router.push('/admin/candidatos')
      })
    }
  }
}
</script>
