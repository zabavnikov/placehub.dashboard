<template>
  <layout heading="Места">
    <template #subtitle>{{ isEdit ? 'Редактирование категории' : 'Создание категории' }}</template>
    <template #content>
      <div>
        <select v-model="category.parent_id" class="input">
          <option :value="null">Без родительской категории</option>
          <option :selected="category.parent_id === category.id" v-for="category in parents" :key="category.id" :value="category.id">{{ category.name }}</option>
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
          this.parents.forEach(cat => {
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
      const { parents, category } = await $axios.$get(`/api/map/places/categories/form${isEdit ? `/${params.categoryId}` : ''}`);

      return {
        isEdit,
        parents,
        category: category || formInitialState,
      }
    },

    methods: {
      onSubmit() {
        const options = {
          method: this.isEdit ? 'put' : 'post',
          url: `/api/map/places/categories${this.isEdit ? `/${this.category.id}` : ''}`,
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
              this.$router.push({name: 'map.placeCategories.edit', params: { categoryId: data.id }});
            }
          });
      },
    },
  }
</script>
