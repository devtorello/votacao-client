<template>
  <form>
    <div uk-grid class="uk-child-width-1-2">
      <div>
        <legend class="uk-legend">Cadastrar Candidato</legend>
        <div class="uk-margin">
          <label class="uk-form-label">Nome</label>
          <input type="text" class="uk-input">
        </div>
  
        <div class="uk-margin">
          <label class="uk-form-label">URL da Foto</label>
          <input type="text" class="uk-input">
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-primary">Cadastrar</button>
          <router-link tag="button" to="/admin/candidatos" class="uk-button uk-button-text uk-margin-left">Cancelar</router-link>
        </div>
      </div>
      <div>
        <img class="uk-width-1-1" src="https://placehold.it/400x300" uk-img>
      </div>
    </div>

  </form>
</template>

<script>
export default {

}
</script>
