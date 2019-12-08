<template>
  <div class="uk-card uk-card-primary uk-width-3-4 uk-card-body uk-dark">
    <h1>Escolha seu candidato</h1>
    <hr>
    <div class="uk-child-width-1-3@m uk-overflow-auto uk-height-large uk-padding-small" uk-grid>
      <div v-for="numero in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="numero">
        <div class="uk-card uk-card-primary ">
            <div class="uk-card-media-top">
              <img src="https://placehold.it/400x300" class="uk-width-1-1" uk-img>
            </div>
            <div class="uk-card-body">
                <h3>Nome do Candidato</h3>
                <a class="uk-button uk-button-default">Votar</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>