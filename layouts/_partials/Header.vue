<template>
  <header class="bg-blue-800 p-6">
    <n-link to="/" class="text-white text-xl tracking-tight">Dashboard</n-link>
    <div class="text-sm flex">
      <n-link to="/" class="text-white mr-2">Пользователи</n-link>
      <n-link to="/map" class="text-white">Карта</n-link>
      <span v-if="$auth.loggedIn" @click="$auth.logout()" class="ml-auto text-white cursor-pointer">Выйти</span>
    </div>
  </header>
</template>