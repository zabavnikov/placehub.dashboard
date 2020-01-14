<template>
  <div style="display: flex; padding: .75rem; margin-bottom: 1.5rem; background-color: #eef3fc">
    <b-button v-for="item in menu" :key="item.href" tag="router-link" :to="item.href" type="is-info" outlined style="margin-right: .75rem;">
      {{ item.name }}
    </b-button>
  </div>
</template>

<script>
  export default {
    computed: {
      menu() {
        return [
          {name: 'Создать место', href: '/geo/create'},
          {name: 'Создать категорию', href: '/geo/categories/create'},
          {name: 'Создать тип населенного пункта', href: '/geo/types/create'},
        ]
      }
    }
  }
</script>