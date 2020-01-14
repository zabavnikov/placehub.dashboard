<template>
  <layout>
    <template #content>
      <div class="form-field" :class="{'is-invalid': errors.has('email')}">
        <label for="email">Электронная почта <span class="text-error">*</span></label>
        <div class="form-control">
          <input v-model="form.email" id="email" class="input" type="text" placeholder="Введите адрес электронной почты">
        </div>
        <div v-if="errors.has('email')" class="form-help">{{ errors.first('email') }}</div>
      </div>

      <div class="form-field" :class="{'is-invalid': errors.has('password')}">
        <label for="password">Пароль <span class="text-error">*</span></label>
        <div class="form-control">
          <input v-model="form.password" id="password" class="input" type="password"
                 placeholder="Введите пароль">
        </div>
        <div v-if="errors.has('password')" class="form-help">{{ errors.first('password') }}</div>
      </div>

      <div class="form-field form-field--large">
        <button type="button" class="button button--success" @click="onSubmit">Войти в профиль</button>
      </div>
    </template>
  </layout>
</template>

<script>
  import Errors from '~/helpers/errors';

  export default {
    layout: 'empty',

    data() {
      return {
        head: {
          title: 'Войти в профиль'
        },

        form: {
          email: null,
          password: null,
        },

        errors: new Errors()
      }
    },

    head() {
      return this.head
    },

    methods: {
      onSubmit() {
        this.$auth.loginWith('local', {
          data: this.form
        }).catch(errors => this.errors.record(errors))
      }
    }
  }
</script>
