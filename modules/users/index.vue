<template>
  <layout>
    <template slot="title">Пользователи</template>
    <div slot="content">
      <table class="w-full">
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Никнейм</th>
          <th class="text-left">Подтвержден</th>
          <th class="text-left">Дата регистрации</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in users.data" :key="item.id">
          <td class="text-left">{{ item.id }}</td>
          <td class="text-left">{{ item.username }}</td>
          <td class="text-left">{{ item.email_verified_at }}</td>
          <td class="text-left">{{ item.created_at }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </layout>
</template>

<script>
  export default {
    asyncData({ $axios }) {
      const gql = `{
        users {
          data {
            id
            username
            email_verified_at
            created_at
          }
        }
      }`;

      return $axios.$post('/gql', {query: gql})
        .then(({ data }) => {
          return {
            users: data.users,
          }
        });
    },

    computed: {
      headers() {
        return [
          {text: 'Действие', value: 'action', sortable: false},
        ]
      }
    }
  }
</script>
