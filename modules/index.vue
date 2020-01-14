<template>
  <layout>
    <template #content>
      <div v-if="$auth.loggedIn">{{ $auth.user.name }}</div>
    </template>
  </layout>
</template>
