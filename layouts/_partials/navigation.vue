<template>
  <aside class="menu">
    <ul class="menu-list">
      <li v-for="item in menu">
        <n-link :to="item.href">{{ item.name }}</n-link>
        <ul v-if="item.hasOwnProperty('menu')">
          <li v-for="submenu in item.menu"><n-link :to="submenu.href">{{ submenu.name }}</n-link></li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    computed: {
      menu() {
        return [
          {
            name: 'Места',
            icon: 'home',
            href: '/places',
            menu: [
              { href: '/places/categories', name: 'Категории мест' },
              { href: '/places/types', name: 'Тип населенных пунктов' },
            ]
          }
        ]
      }
    },
  }
</script>
