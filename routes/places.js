module.exports = [
  {path: '/places', name: 'places', component: 'places/pages/index'},

  {path: '/places/create', name: 'places.create', component: 'places/pages/form'},
  {path: '/places/:placesId/edit', name: 'places.edit', component: 'places/pages/form'},

  {path: '/places/categories', name: 'places.placeCategories', component: 'places/pages/categories/index'},
  {path: '/places/categories/create', name: 'places.placeCategories.create', component: 'places/pages/categories/form'},
  {path: '/places/categories/:categoryId/edit', name: 'places.placeCategories.edit', component: 'places/pages/categories/form'},

  {path: '/places/locality-types', name: 'places.localityTypes', component: 'places/pages/types/index'},
  {path: '/places/locality-types/create', name: 'places.localityTypes.create', component: 'places/pages/types/form'},
  {path: '/places/locality-types/:typeId/edit', name: 'places.localityTypes.edit', component: 'places/pages/types/form'},
];
