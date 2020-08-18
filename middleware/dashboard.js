export default function({ auth, error, redirect, route }) {
  /*
    Гостя пропускам только на /login
   */
  if (route.path !== '/login') {
    if (! auth.loggedIn) {
      return redirect('/login');
    }

    if (auth.user.role !== 'administrator') {
      error(403);
    }
  }
}
