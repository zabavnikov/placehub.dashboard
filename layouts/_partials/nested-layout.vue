<template>
  <div>
    <layout-header></layout-header>

    <div class="flex min-h-screen">
      <div class="bg-indigo-200 w-1/5">
        <layout-menu></layout-menu>
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
        <div class="flex p-6">
          <div class="w-3/5">
            <slot name="content"></slot>
          </div>
          <div class="w-2/5 ml-4">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from './navigation'
  import LayoutHeader from './Header'
  import LayoutMenu from './Menu';

  export default {
    props: {
      heading: {
        type: String,
        default: '',
      }
    },

    components: {
      LayoutHeader,
      LayoutMenu,
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
