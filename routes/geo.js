import GeoIndex from '../modules/geo/pages/index';
import GeoForm from '../modules/geo/pages/form';
import GeoCategories from '../modules/geo/pages/categories/index';
import GeoCategoriesForm from '../modules/geo/pages/categories/form';
import GeoTypes from '../modules/geo/pages/types/index';
import GeoTypesForm from '../modules/geo/pages/types/form';

export default [
  {path: '/geo', name: 'geo', component: GeoIndex},

  {path: '/geo/create', name: 'geo.create', component: GeoForm},
  {path: '/geo/:geoId/edit', name: 'geo.edit', component: GeoForm},

  {path: '/geo/categories', name: 'geo.placeCategories', component: GeoCategories},
  {path: '/geo/categories/create', name: 'geo.placeCategories.create', component: GeoCategoriesForm},
  {path: '/geo/categories/:categoryId/edit', name: 'geo.placeCategories.edit', component: GeoCategoriesForm},

  {path: '/geo/types', name: 'geo.localityTypes', component: GeoTypes},
  {path: '/geo/types/create', name: 'geo.localityTypes.create', component: GeoTypesForm},
  {path: '/geo/types/:typeId/edit', name: 'geo.localityTypes.edit', component: GeoTypesForm},
]
