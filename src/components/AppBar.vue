<template>
  <v-app-bar color="primary" density="compact">
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>PlantUML Editor</v-app-bar-title>

    <v-spacer />

    <v-btn @click="openGitHub" icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>

    <!-- <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template> -->
  </v-app-bar>
</template>

<script setup>
function openGitHub() {
  window.open("https://github.com/mishannn/plantuml-mobile-editor", "_blank")
}
</script>
