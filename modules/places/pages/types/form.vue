<template>
  <v-layout :heading="isEdit ? 'Редактирование типа населенного пункта' : 'Создание типа населенного пункта'">
    <template #content>
      <input v-model="type.name" class="input" type="text">

      <div class="mt-4">
        <button @click="onSubmit" class="button">Сохранить</button>
      </div>
    </template>
  </v-layout>
</template>

<script>
  const formInitialState = {
    name: '',
  };

  export default {
    async asyncData({$axios, params}) {
      const isEdit = params.typeId > 0;
      let type = formInitialState;


      if (isEdit) {
        type = await $axios.$get('/api/places/locality-types/form/' + params.typeId);
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
          url: `/api/places/locality-types${this.isEdit ? `/${this.type.id}` : ''}`,
          data: this.type,
        };

        this.$axios(options)
          .then(() => this.$router.push({name: 'map.localityTypes'}));
      },
    },
  }
</script>
