<template>
  <div class="uk-card uk-card-primary uk-width-1-3 uk-card-body uk-dark" >
    <form>
      <legend class="uk-legend">Entrar</legend>
      <div class="uk-margin">
        <label class="uk-form-label">CPF</label>
        <input type="text" class="uk-input" v-model="CPF">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Senha</label>
        <input type="password" class="uk-input" v-model="senha">
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-default" type="button" @click="login">Entrar</button>
        <router-link tag="button" to="/" class="uk-button uk-button-text uk-margin-small-left" type="button">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Auth from '../../utils/auth'
import gql from 'graphql-tag'
// import User from '../../utils/user'

export default {
  data() {
    return {
      CPF: '',
      senha: ''
    }
  },
  methods: {
    login() {
      if (!this.CPF || !this.senha) {
        alert('Os dados estão faltando!')
        return
      }

      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $CPF: String!,
            $password: String!
          ) {
            signIn(CPF: $CPF, password: $password) {
              token,
              CPF
            }
          }
        `,
        variables: {
          CPF: this.CPF,
          password: this.senha
        }
      }).then(data => {
        if (!data) {
          alert('Dados incorretos!')
          return
        }

        Auth.set(data.data.signIn.token)
        this.$router.push(`/vote`)
      }).catch(() => {
        alert('Os dados podem estar incorretos! Tente novamente.')
      })
    }
  }
}
</script>
