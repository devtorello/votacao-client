<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-body">
      <main class=" uk-flex uk-flex-column uk-flex-center uk-flex-middle">
        <h1>Bem-vindo ao sistema de Votação de Representante de Classe!</h1>
        <p class="uk-text-lead">Se quiser votar, entre ou cadastre-se no sistema:</p>
        <p uk-margin>
          <router-link to="/login"
            tag="a"
            class="uk-button uk-button-secondary uk-button-large uk-width-medium uk-margin-small-right">
            Entrar
          </router-link>
          <router-link to="/register"
            tag="a"
            class="uk-button uk-button-secondary uk-button-large uk-width-medium">
            Cadastrar
          </router-link>
        </p>
      </main>
    </div>
  </div>
</template>

<script>
export default {

}
</script>