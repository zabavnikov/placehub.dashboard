<template>
  <div></div>
</template>

<script>
  export default {
    middleware: 'guest',

    async asyncData({app, $axios, params, query}) {
      await $axios
        .$get(`/api/users/oauth/${params.providerType}/callback?code=${query.code}`)
        .then(response => {
          app.$auth.setUserToken(response.access_token);
        })
        .catch(error => {
          console.log(error);
        });
    },

    created() {
      if (this.$auth.loggedIn) {
        this.$router.push('/');
      }
    }
  }
</script>
