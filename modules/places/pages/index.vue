<template>
  <v-layout heading="Места">
    <template #toolbar>
      <span class="mr-2">Показать только:</span>
      <n-link :to="{name: 'places', query: {type: 'countries'}}" class="underline mr-2">страны</n-link>
      <n-link :to="{name: 'places', query: {type: 'regions'}}" class="underline mr-2">регионы</n-link>
      <n-link :to="{name: 'places', query: {type: 'localities'}}" class="underline mr-2">населенные пункты</n-link>
      <n-link :to="{name: 'places', query: {type: 'places'}}" class="underline">места</n-link>
    </template>
    <template #content>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Название</th>
            <th class="border px-4 py-2">Тип</th>
            <th class="border px-4 py-2">Геопривязка</th>
            <th class="border px-4 py-2">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="place in places.data" :key="place.id">
            <td class="border px-4 py-2">{{ place.id }} </td>
            <td class="border px-4 py-2">
              <n-link :to="{name: 'places', query: {parentId: place.id}}">{{ place.name }}</n-link>
            </td>
            <td class="border px-4 py-2">
              <n-link :to="{name: 'places', query: {type: place.type}}">{{ place.type }}</n-link>
            </td>
            <!--<td class="border px-4 py-2">
              <n-link :to="{name: 'places', query: {parentId: place.parent_id}}">{{ place.parent_names }}</n-link>
            </td>-->
            <td class="border px-4 py-2">
              <n-link :to="{name: 'map.edit', params: {mapId: place.id}}" title="Редактировать">
                <i class="fa fa-pencil"></i>
              </n-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </v-layout>
</template>

<script>
  export default {
    asyncData({ $axios, query }) {
      return $axios
        .$get('/api/places', {
          params: {
            limit: 255,
            paginate: true,
          }
        })
        .then(places => {
          return {places}
        });
    }
  }
</script>
