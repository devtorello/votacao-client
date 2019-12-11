<template>
  <div class="uk-card uk-card-primary uk-width-1-3 uk-card-body uk-dark" >
    <form>
      <legend class="uk-legend">Cadastro</legend>
      <div class="uk-margin">
        <label class="uk-form-label">Nome</label>
        <input type="text" class="uk-input" v-model="nome">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Sobrenome</label>
        <input type="text" class="uk-input" v-model="sobrenome">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">CPF</label>
        <input type="text" class="uk-input" v-model="CPF">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Senha</label>
        <input type="password" class="uk-input" v-model="senha">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Confirmar Senha</label>
        <input type="password" class="uk-input" v-model="confSenha">
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-default" type="button" @click="createUser">Registrar</button>
        <router-link tag="button" to="/" class="uk-button uk-button-text uk-margin-small-left" type="button">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      nome: '',
      sobrenome: '',
      CPF: '',
      senha: '',
      confSenha: ''
    }
  },
  methods: {
    createUser() {
      if (this.senha != this.confSenha) {
        alert('Senhas incorretas!')
        return
      }

      this.$apollo.mutate({
        mutation: gql`
          mutation (
            $firstName: String!,
            $lastName: String!,
            $CPF: String!,
            $password: String!
          ) {
            signUp(firstName: $firstName, lastName: $lastName, CPF: $CPF, password: $password) {
              id
            }
          }
        `,
        variables: {
          firstName: this.nome,
          lastName: this.sobrenome,
          CPF: this.CPF,
          password: this.senha
        }
      }).then(data => {
        if (!data) {
          alert('Erro!')
          return
        }

        this.nome = ''
        this.sobrenome = ''
        this.CPF = ''
        this.senha = ''
        this.confSenha = ''

        alert('Usuário criado!')
        this.$router.push('/')
      })
    }
  }
}
</script>