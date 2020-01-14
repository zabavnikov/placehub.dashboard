<template>
  <layout :heading="isEdit ? 'Редактирование типа населенного пункта' : 'Создание типа населенного пункта'">
    <template #content>
      <input v-model="type.name" class="input" type="text">

      <div class="mt-4">
        <button @click="onSubmit" class="button">Сохранить</button>
      </div>
    </template>
  </layout>
</template>

<script>
  const formInitialState = {
    name: '',
  };

  export default {
    async asyncData({$axios, params}) {
      const isEdit = params.typeId > 0;

      let gql = '', type = formInitialState;

      if (isEdit) {
        gql = `{
          geoLocalityType(id: ${params.typeId}) {
            id
            name
          }
        }`;

        const { data } = await $axios.$post('/gql', {query: gql});

        type = data.geoLocalityType || formInitialState;
      }

      return {
        isEdit,
        type,
      }
    },

    methods: {
      onSubmit() {
        const options = {
          method: this.isEdit ? 'put' : 'post',
          url: process.env.API_GEO + `/types${this.isEdit ? `/${this.type.id}` : ''}`,
          data: this.type,
        };

        this.$axios(options)
          .then(() => this.$router.push('/geo/types'));
      },
    },
  }
</script>
