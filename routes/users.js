import UsersIndex from '../modules/users/index';
import AuthLogin from '../modules/login';

export default [
  {path: '/login', name: 'auth.login', component: AuthLogin},
  {path: '/users', name: 'users', component: UsersIndex},
]
