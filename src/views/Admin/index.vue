<template>
  <div class="uk-card uk-card-body uk-card-default uk-dark uk-width-3-5">
    <div>
      <ul class="uk-child-width-expand" uk-tab>
          <router-link tag="li" to="/admin">
            <a href="#">Dashboard</a>
          </router-link>
          <router-link tag="li" to="/admin/candidatos" active-class="uk-active">
            <a href="#">Candidatos</a>
          </router-link>
          <router-link tag="li" to="/admin/apurar">
            <a href="#">Apuração de Votos</a>
          </router-link>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
