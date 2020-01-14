export default function({ store, error, redirect }) {
  if (store.state.auth.loggedIn !== true) {
    return redirect('/');
  }
}
