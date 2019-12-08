<template>
    <main>
      <div uk-grid class="uk-margin">
        <div class="uk-width-1-3">
          <img src="https://placehold.it/400x300" class="uk-width-1-1" uk-img>
        </div>
        <div class="uk-width-2-3">
          <h2>O vencedor é <b class="uk-text-primary">Murilo Pereti Tavares</b></h2>
          <p class="uk-text-lead">O candidato Murilo Pereti Tavares, venceu a eleição com um total de 66 votos, representando 74% dos votos.</p>
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
            <tr v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="i">
              <td>Murilo Pereti Tavares</td>
              <td>469.267.118-10</td>
              <td>66</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
</template>

<script>
export default {
  
}
</script>
