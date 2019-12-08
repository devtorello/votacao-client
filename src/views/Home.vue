<template>
    <main class=" uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-light">
      <h1>Bem-vindo ao sistema de votação de Condomínio!</h1>
      <p class="uk-text-lead">Para votar, entre ou cadastre-se no sistema:</p>
      <p uk-margin>
        <router-link to="/login"
          tag="a"
          class="uk-button uk-button-default uk-button-large uk-width-medium uk-margin-small-right">
          Entrar
        </router-link>
        <router-link to="/register"
          tag="a"
          class="uk-button uk-button-default uk-button-large uk-width-medium">
          Cadastrar
        </router-link>
      </p>
    </main>
</template>

<script>
export default {

}
</script>