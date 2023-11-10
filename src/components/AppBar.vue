<template>
  <v-app-bar color="primary" density="compact">
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>PlantUML Editor</v-app-bar-title>

    <v-spacer />

    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-file</v-icon>
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Open">
          <div style="padding: 16px">
            <v-file-input label="PlantUML file" v-model:model-value="fileForOpen"></v-file-input>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close" @click="isActive.value = false"></v-btn>
            <v-btn text="Open" color="primary" :disabled="!fileForOpen" @click="openFile(isActive)"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Save">
          <div style="padding: 16px">
            <v-radio-group v-model:model-value="downloadType">
              <v-radio label="Code" value="code"></v-radio>
              <v-radio label="Diagram" value="image"></v-radio>
            </v-radio-group>

            <v-text-field
              label="Name"
              v-model:model-value="downloadName"
            ></v-text-field>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close" @click="isActive.value = false"></v-btn>
            <v-btn text="Save" color="primary" @click="download(isActive)"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-btn @click="openGitHub" icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>

    <!-- <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template> -->
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["download", "open"]);

function openGitHub() {
  window.open("https://github.com/mishannn/plantuml-mobile-editor", "_blank");
}

const fileForOpen = ref()

function openFile(isActive) {
  emit("open", fileForOpen.value[0])
  isActive.value = false
}

const downloadType = ref("code");
const downloadName = ref("");

function download(isActive) {
  emit("download", {
    downloadType: downloadType.value,
    downloadName: downloadName.value,
  });
  isActive.value = false
}
</script>
