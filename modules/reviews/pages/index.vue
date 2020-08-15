<template>
  <v-layout>
    <template #content>
      <div v-for="review in reviews.data" :key="review.id">
        <div>{{ review.pluses || '-' }}</div>
        <div>{{ review.minuses || '-' }}</div>
        <div>{{ review.text || '-' }}</div>
        <button v-if="review.approved_by === null" type="button" class="button" @click="onApprove(review.id)">Подтвердить</button>
      </div>
    </template>
  </v-layout>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios.get('/api/reviews/unapproved')
      .then(({ data }) => {
        return {
          reviews: data,
        }
      })
  },

  methods: {
    onApprove(reviewId) {
      if (! window.confirm('Вы хотите подтвердить отзыв?')) {
        return;
      }

      this.$axios
        .$put('/api/reviews/' + reviewId + '/approve');
    },
  }
}
</script>
