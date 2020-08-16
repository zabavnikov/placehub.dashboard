<template>
  <v-layout>
    <template #content>
      <div class="space-y-4">
        <div v-for="item in feedback.data" :key="item.id">
          {{ item.text }}
          <div class="mt-2">{{ item.name }} - {{ item.email }}></div>
        </div>
      </div>
    </template>
  </v-layout>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios.get('/api/feedback')
      .then(({ data }) => {
        return {
          feedback: data,
        }
      })
  },
}
</script>
