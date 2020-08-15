<template>
  <v-layout>
    <template #content>
      <div v-if="$auth.loggedIn">{{ $auth.user.name }}</div>
    </template>
  </v-layout>
</template>
