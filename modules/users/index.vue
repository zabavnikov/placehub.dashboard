<template>
  <layout>
    <template slot="title">Пользователи</template>
    <div slot="content">
      <v-simple-table>
        <thead>
        <tr>
          <th class="text-xs-left">ID</th>
          <th class="text-xs-left">Никнейм</th>
          <th class="text-xs-left">Подтвержден</th>
          <th class="text-xs-left">Дата регистрации</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in users.data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.email_verified_at }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
        </tbody>
      </v-simple-table>
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
            nickname
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
