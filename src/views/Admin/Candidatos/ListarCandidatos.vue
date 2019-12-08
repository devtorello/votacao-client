<template>
    <main>
      <div class="uk-margin">
        <router-link to="/admin/candidatos/novo" tag="button" class="uk-button uk-button-primary">Novo Candidato</router-link>
      </div>
      <div class=" uk-overflow-auto uk-height-large">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="">Nome</th>
              <th class="">CPF</th>
              <th class="">Apartamento</th>
              <th class="">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="i">
              <td>Murilo Pereti Tavares</td>
              <td>469.267.118-10</td>
              <td>33</td>
              <td>
                <button class="uk-button uk-button-default">Remover</button>
              </td>
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
