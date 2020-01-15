<template>
  <layout>
    <template #heading>{{ isEdit ? 'Редактирование места' : 'Добавление места' }}</template>
    <template #sidebar>
      <div v-if="place.type === 'localities'" class="mb-4">
        <div class="mb-4">
          <label for="locality-type-id">Тип населенного пункта</label>
          <select v-model="place.locality_type_id" id="locality-type-id" class="input">
            <option v-for="localityType in localityTypes" :value="localityType.id" :key="localityType.id">{{ localityType.name }}</option>
          </select>
        </div>

        <label for="is-capital">
          <input v-model="place.is_capital" id="is-capital" type="checkbox">
          Населенный пункт является столицей?
        </label>
      </div>

      <div v-if="place.type === 'places'" class="mb-4">
        <label for="place-category-id">Категория места</label>
        <select v-model="place.place_category_id" id="place-category-id" class="input">
          <optgroup v-for="section in sections" :value="section.id" :key="section.id" :label="section.name">
            <option v-for="category in section.categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </optgroup>
        </select>
      </div>

      <label for="contributor-id">
        <div>ID пользователя предложившего место</div>
        <input v-model="place.contributor_id" id="contributor-id" type="number" class="input">
      </label>
    </template>

    <template #content>
      <div class="flex">
        <label for="type-region" class="mr-4">
          <input type="radio" v-model="place.type" id="type-region" name="type" value="regions">
          <span>Регион</span>
        </label>
        <label for="type-locality" class="mr-4">
          <input type="radio" v-model="place.type" id="type-locality" name="type" value="localities">
          <span>Населенный пункт</span>
        </label>
        <label for="type-place">
          <input type="radio" v-model="place.type" id="type-place" name="type" value="places">
          <span>Место</span>
        </label>
      </div>

      <div class="mt-4">
        <input :value="query" @input="onSearch" type="text" class="input" placeholder="Название страны, региона или населенного пункта">
        <ul v-show="places.length">
          <li v-for="item in places" :key="item.id" @click="onSelect(item)">{{ item.full_name }}</li>
        </ul>
      </div>

      <div class="mt-4">
        <input type="text" class="input" v-model="place.name">
      </div>

      <div class="flex mt-4">
        <div class="mr-2">Широта
          <input type="number" class="input" v-model="place.lat">
        </div>
        <div>Долгота
          <input type="number" class="input" v-model="place.lng">
        </div>
      </div>

      <div class="mt-4">
        <button @click="onSubmit" class="button button-primary">Сохранить</button>
      </div>
    </template>
  </layout>
</template>

<script>
  import debounce from 'lodash/debounce';

  const localityRegionState = {
    parent_id: null,
    contributor_id: 1,
    locality_type_id: null,
    place_category_id: null,
    name: '',
    lat: 0,
    lng: 0,
    is_capital: false,
    type: null,
  };

  export default {
    data() {
      return {
        success: false,
        places: [],
        types: ['country']
      }
    },

    watch: {
      'place.type'(type) {
        // reset fields
        if (type !== 'places') {
          this.place.place_category_id = null;
        }

        // reset fields
        if (type !== 'localities') {
          this.place.locality_type_id = null;
          this.place.is_capital = false;
        }

        if (type === 'places') {
          this.types = ['regions', 'localities'];
        }

        if (type === 'localities') {
          this.types = ['regions'];
        }

        if (type === 'regions') {
          this.types = ['countries'];
        }
      }
    },

    async asyncData({$axios, params}) {
      const isEdit = params.geoId > 0;

      let placeQuery = '';

      if (isEdit) {
        placeQuery = `
          place(id: ${params.geoId}) {
            id
            locality_type_id
            place_category_id
            parent_id
            contributor_id
            name
            type
            full_name
            parent_names
            description
            lat
            lng
            is_capital
            parents
          }
        `;
      }

      let gql = `{
        geoLocalityTypes {
          id
          name
        }
        geoPlaceCategories {
          id
          parent_id
          name
        }
        ${placeQuery}
      }`;

      const { data } = await $axios.$post('/gql', {query: gql});

      const sections = {}, categories = [];

      if (data.geoPlaceCategories) {
        data.geoPlaceCategories.forEach(category => {
          if (category.parent_id === null) {
            sections[category.id] = {...category};
          } else {
            categories.push(category);
          }
        });

        categories.forEach(category => {
          if (! sections[category.parent_id].hasOwnProperty('categories')) {
            sections[category.parent_id]['categories'] = [];
          }

          sections[category.parent_id]['categories'].push(category);
        });
      }

      return {
        isEdit,
        localityTypes: data.geoLocalityTypes,
        sections,
        place: data.place || {...localityRegionState},
        query: data.place && data.place.parent_names || '',
      }
    },

    methods: {
      onSubmit() {
        if (! confirm('Вся информация указана верно?')) {
          return;
        }

        const options = {
          method: this.isEdit ? 'put' : 'post',
          url: `/api/geo${this.isEdit ? `/${this.place.id}` : ''}`,
          data: this.place,
        };

        this.$axios(options)
          .then(({ data }) => {
            if (this.isEdit) {
              this.$toast.success('Данные успешно изменены');
            } else {
              this.$router.push({name: 'geo.edit', params: { geoId: data.id }});
            }
          });
      },

      onSelect(item) {
        this.query = item.full_name;
        this.place.parent_id = item.id;
        this.places = [];
      },

      /**
       * Поиск родительского места.
       */
      onSearch: debounce(function (event) {
        let query = event.target.value;

        if (query.length < 2) {
          this.places = [];
          return;
        }

        this.$axios
          .$post('/api/geo/search', {
            query,
            types: this.types,
          })
          .then(response => {
            this.places = response;
            this.query = query;
          });
      }, 500)
    },
  }
</script>
