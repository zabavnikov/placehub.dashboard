<template>
  <div>
    <v-layout-header></v-layout-header>

    <div class="flex min-h-screen">
      <div class="bg-indigo-200 w-1/5">
        <v-layout-menu></v-layout-menu>
      </div>

      <div class="bg-indigo-100 w-4/5">
        <div v-show="heading.length" class="h-16 px-6 flex items-center bg-indigo-200 border-b border-indigo-100 text-xl">
          <h1>{{ heading }}</h1>
        </div>
        <div v-show="hasToolbarSlot" class="flex items-center h-12 px-6 text-sm border-b border-indigo-200">
          <div>
            <slot name="toolbar"></slot>
          </div>
        </div>
        <div :class="{'p-6': true, 'flex': hasSidebarSlot}">
          <div :class="{'w-3/5': hasSidebarSlot}">
            <slot name="content"></slot>
          </div>
          <div v-show="hasSidebarSlot" class="w-2/5 ml-4">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from './navigation'
  import VLayoutHeader from './Header'
  import VLayoutMenu from './Menu';

  export default {
    props: {
      heading: {
        type: String,
        default: '',
      }
    },

    components: {
      VLayoutHeader,
      VLayoutMenu,
      Navigation,
    },

    computed: {
      menu() {
        return menu;
      },

      hasHeadingSlot () {
        return !!this.$slots['heading']
      },

      hasPageDescriptionSlot () {
        return !!this.$slots['page-description']
      },

      hasToolbarSlot () {
        return !!this.$slots['toolbar']
      },

      hasSidebarSlot () {
        return !!this.$slots['sidebar']
      }
    }
  }
</script>
