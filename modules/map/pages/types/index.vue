<template>
  <layout heading="Категории мест">
    <template #content>
      <table class="table-auto w-full">
        <thead>
        <tr>
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Название</th>
          <th class="border px-4 py-2">Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="type in types" :key="type.id">
          <td class="border px-4 py-2">{{ type.id }} </td>
          <td class="border px-4 py-2">{{ type.name }}</td>
          <td class="border px-4 py-2">
            <n-link :to="{name: 'map.localityTypes.edit', params: {typeId: type.id}}" title="Редактировать">
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
    async asyncData({ $axios }) {
      const types = await $axios.$get('/api/places/locality-types');

      return {
        types
      }
    }
  }
</script>
