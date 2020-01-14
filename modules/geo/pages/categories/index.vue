<template>
  <layout heading="Категории мест">
    <template #content>
      <table class="table-auto w-full">
        <thead>
        <tr>
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Название</th>
          <th class="border px-4 py-2">Родительская категория</th>
          <th class="border px-4 py-2">Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td class="border px-4 py-2">{{ category.id }}</td>
          <td :class="{'border px-4 py-2': true, 'font-bold': !category.parent_id}">{{ category.name }}</td>
          <td class="border px-4 py-2"><b>{{ category.parent_id ? category.parent.name : '-' }}</b></td>
          <td class="border px-4 py-2">
            <n-link :to="{name: 'geo.placeCategories.edit', params: {categoryId: category.id}}" title="Редактировать">
              <i class="fa fa-pencil"></i>
            </n-link>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </layout>
</template>

<script>
  export default {
    async asyncData({ $axios, params }) {
      const isEdit = params.categoryId > 0;

      let gql = `{
        geoPlaceCategories {
          id
          parent_id
          name
          parent {id name}
        }
      }`;

      const { data } = await $axios.$post('/gql', {query: gql});

      return {
        isEdit,
        categories: data.geoPlaceCategories,
      }
    }
  }
</script>
