export default function({ store, error, redirect, route }) {
  /*
    Гостя пропускам только на /login
   */
  if (route.path !== '/login') {
    if (! store.state.auth.loggedIn) {
      return redirect('/login');
    }

    if (store.state.auth.user.id !== 1) {
      error(403);
    }
  }
}
