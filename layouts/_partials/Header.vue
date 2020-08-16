<template>
  <header>
    <div class="bg-blue-800 p-4">
      <n-link to="/" class="text-white text-xl tracking-tight">Dashboard</n-link>
    </div>
    <div class="text-sm flex">
      <n-link to="/users" class="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800">Пользователи</n-link>
      <n-link to="/places" class="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800">Карта</n-link>
      <n-link to="/reviews" class="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800">Отзывы</n-link>
      <n-link to="/feedback" class="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800">Обратная связь</n-link>
      <span v-if="$auth.loggedIn" @click="$auth.logout()" class="ml-auto text-white cursor-pointer">Выйти</span>
    </div>
  </header>
</template>
