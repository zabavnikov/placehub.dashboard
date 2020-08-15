const users = require('./users');
const places = require('./places');
const reviews = require('./reviews');

const routes = [
  ...users,
  ...places,
  ...reviews,
];

module.exports = (dir, nuxtRoutes, resolve) => {
  routes.forEach(route => {
    nuxtRoutes.push({
      ...route,
      component: resolve(dir, 'modules/' + route.component),
      chunkName: route.name.replace('.', '_'),
    })
  });
};