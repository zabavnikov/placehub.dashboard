<template>
  <layout heading="Места">
    <template #subtitle>{{ isEdit ? 'Редактирование категории' : 'Создание категории' }}</template>
    <template #content>
      <div>
        <select v-model="category.parent_id" class="input">
          <option :value="null">Без родительской категории</option>
          <option :selected="category.parent_id === category.id" v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="mt-4">
        <input v-model="category.name" class="input" type="text">
      </div>

      <div class="mt-4">
        <button @click="onSubmit" class="button button-primary">Сохранить</button>
      </div>
    </template>
  </layout>
</template>

<script>
  const formInitialState = {
    parent_id: null,
    name: '',
  };

  export default {
    data() {
      return {
        selected: 'Без родительской категории',
      }
    },

    watch: {
      'category.parent_id': {
        handler(value) {
          this.categories.forEach(cat => {
            if (value === cat.id) {
              this.selected = cat.name;
            } else {
              this.selected = 'Без родительской категории';
            }
          })
        },
        immediate: true
      }
    },

    async asyncData({$axios, params}) {
      const isEdit = params.categoryId > 0;

      let categoryQuery = '';

      if (isEdit) {
        categoryQuery = `
          geoPlaceCategory(id: ${params.categoryId}) {
            id
            parent_id
            name
          }
        `;
      }

      let gql = `{
        geoPlaceCategories(onlyParents: true) {
          id
          name
        }
        ${categoryQuery}
      }`;

      const { data } = await $axios.$post('/gql', {query: gql});

      return {
        isEdit,
        categories: data.geoPlaceCategories,
        category: data.geoPlaceCategory || formInitialState,
      }
    },

    methods: {
      onSubmit() {
        const options = {
          method: this.isEdit ? 'put' : 'post',
          url: process.env.API_GEO + `/categories${this.isEdit ? `/${this.category.id}` : ''}`,
          data: this.category,
        };

        this.$axios(options)
          .then(({ data }) => {
            if (this.isEdit) {
              this.$buefy.snackbar.open({
                message: 'Данные успешно изменены.',
                position: 'is-top',
              })
            } else {
              this.$router.push({name: 'geo.placeCategories.edit', params: { categoryId: data.id }});
            }
          });
      },
    },
  }
</script>
