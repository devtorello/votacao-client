<template>
  <div class="uk-card uk-card-default uk-width-1-3 uk-card-body uk-dark" >
    <form>
      <legend class="uk-legend">Realizar Login</legend>
      <div class="uk-margin">
        <label class="uk-form-label">RA</label>
        <input type="text" class="uk-input" v-model="RA">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Senha</label>
        <input type="password" class="uk-input" v-model="senha">
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-secondary" type="button" @click="login">Entrar</button>
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
      RA: '',
      senha: ''
    }
  },
  methods: {
    login() {
      if (!this.RA || !this.senha) {
        alert('Os dados estão faltando!')
        return
      }

      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $RA: String!,
            $password: String!
          ) {
            signIn(RA: $RA, password: $password) {
              token,
              RA
            }
          }
        `,
        variables: {
          RA: this.RA,
          password: this.senha
        }
      }).then(data => {
        if (!data) {
          alert('Dados incorretos!')
          return
        }

        Auth.set(data.data.signIn.token)

        this.$router.push(`/vote`)
      })
      .catch(() => {
        alert('Erro ao autenticar, verifique os dados e tente novamente!')
        
      })
    }
  }
}
</script>
