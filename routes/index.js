import Vue from 'vue';
import Router from 'vue-router';

import users from './users';
import geo from './geo';

// Homepage
import Homepage from '../modules/index';

Vue.use(Router);

export function createRouter(ssrContext, createDefaultRouter) {
  const defaultRouter = createDefaultRouter(ssrContext);

  return new Router({
    ...defaultRouter.options,

    routes: [
      {path: '/', name: 'homepage', component: Homepage},
      ...users,
      ...geo,
    ]
  })
}
