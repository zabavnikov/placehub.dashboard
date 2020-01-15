import GeoIndex from '../modules/map/pages/index';
import GeoForm from '../modules/map/pages/form';
import GeoCategories from '../modules/map/pages/categories/index';
import GeoCategoriesForm from '../modules/map/pages/categories/form';
import GeoTypes from '../modules/map/pages/types/index';
import GeoTypesForm from '../modules/map/pages/types/form';

export default [
  {path: '/map', name: 'map', component: GeoIndex},

  {path: '/map/create', name: 'map.create', component: GeoForm},
  {path: '/map/:mapId/edit', name: 'map.edit', component: GeoForm},

  {path: '/map/categories', name: 'map.placeCategories', component: GeoCategories},
  {path: '/map/categories/create', name: 'map.placeCategories.create', component: GeoCategoriesForm},
  {path: '/map/categories/:categoryId/edit', name: 'map.placeCategories.edit', component: GeoCategoriesForm},

  {path: '/map/types', name: 'map.localityTypes', component: GeoTypes},
  {path: '/map/types/create', name: 'map.localityTypes.create', component: GeoTypesForm},
  {path: '/map/types/:typeId/edit', name: 'map.localityTypes.edit', component: GeoTypesForm},
]
