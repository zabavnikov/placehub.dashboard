<template>
  <ul>
    <li v-for="(section, sectionIndex) in menu" :key="sectionIndex">
      <n-link :to="section.href" class="flex items-center h-16 px-6 border-b border-indigo-200 bg-indigo-300 hover:bg-pink-600 hover:text-white">
        <span class="uppercase tracking-wide font-bold text-sm">{{ section.name }}</span>
      </n-link>
      <ul v-if="section.hasOwnProperty('menu')">
        <li v-for="(category, categoryIndex) in section.menu" :key="categoryIndex">
          <n-link :to="category.href" class="flex items-center h-12 px-6 bg-indigo-400 hover:bg-indigo-500 hover:text-white">
            <span class="text-sm">{{ category.name }}</span>
          </n-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import places from './places';

  const menu = {
    places,
  };

  export default {
    computed: {
      menu() {
        const pageName = this.$route.name.split('.')[0];

        if (menu.hasOwnProperty(pageName)) {
          return menu[pageName];
        }

        return [];
      },
    }
  }
</script>

