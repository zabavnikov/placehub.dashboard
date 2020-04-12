<template>
  <layout :heading="isEdit ? 'Редактирование геообъекта' : 'Создание геообъекта'">
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
        <label for="name">Название</label>
        <input type="text" class="input" id="name" v-model="place.name">
      </div>

      <div class="mt-4">
        <label for="parent-id">Родительский геообъект</label>
        <input :value="query" @input="onSearch" id="parent-id" type="text" class="input" placeholder="Название страны, региона или населенного пункта">
        <ul v-show="places.length">
          <li v-for="item in places" :key="item.id" @click="onSelect(item)" class="cursor-pointer hover:font-bold">{{ item.full_name }}</li>
        </ul>
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
    description: '',
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
        parentTypes: {
          regions: ['countries'],
          localities: ['regions'],
          places: ['regions', 'localities'],
        },
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
      }
    },

    async asyncData({$axios, params}) {
      const isEdit = params.mapId > 0;

      const { map, places_categories, localities_types } = await $axios.$post(`/api/geo/form/${params.mapId ? params.mapId : ''}`);

      const sections = {}, categories = [];

      if (places_categories) {
        places_categories.forEach(category => {
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
        localityTypes: localities_types,
        sections,
        place: map || {...localityRegionState},
        query: map && map.parent_names || '',
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
              this.$router.push({name: 'map.edit', params: { mapId: data.id }});
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
            types: this.parentTypes[this.place.type],
          })
          .then(response => {
            this.places = response;
            this.query = query;
          });
      }, 500)
    },
  }
</script>
