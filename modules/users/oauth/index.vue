<template>
  <layout>
    <template #heading>Вход через социальные сети</template>
    <template #content>
      <div class="p-6">
        <div @click="oauth('vkontakte')" class="cursor-pointer">Вконтакте</div>
        <br>
        <br>
        <div>
          Авторизуясь, вы соглашаетесь с <n-link to="/pages/terms" style="text-decoration: underline;">правилами пользования сайтом</n-link>
          и даете <n-link to="/pages/agreement" style="text-decoration: underline;">согласие на обработку персональных данных</n-link>.
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
  export default {
    methods: {
      oauth(providerType) {
        this.$axios
          .$get('/api/users/oauth/' + providerType)
          .then(response => {
            window.location.replace(response.url);
          })
          .catch(error => console.log(error))
      },
    }
  }
</script>
