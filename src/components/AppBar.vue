<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-title>PlantUML Editor</v-app-bar-title>

    <v-spacer />

    <v-btn icon @click="toggleMode">
      <v-icon v-if="mode === 'preview'">mdi-pencil</v-icon>
      <v-icon v-else>mdi-eye</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon icon="mdi-file" />
              </template>
              <v-list-item-title>Open</v-list-item-title>
            </v-list-item>
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
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon :icon="downloadButtonIcon" />
              </template>
              <v-list-item-title>{{ downloadButtonLabel }}</v-list-item-title>
            </v-list-item>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card :title="downloadButtonLabel">
              <div style="padding: 16px">
                <v-radio-group v-model:model-value="downloadType">
                  <v-radio label="Code" value="code"></v-radio>
                  <v-radio label="Diagram" value="image"></v-radio>
                </v-radio-group>

                <v-text-field label="Name" v-model:model-value="downloadName"></v-text-field>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" @click="isActive.value = false"></v-btn>
                <v-btn text="Save" color="primary" @click="download(isActive)"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-list-item @click="openGitHub">
          <template v-slot:prepend>
            <v-icon icon="mdi-github" />
          </template>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template> -->
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(["download", "open", "update:mode"]);

function toggleMode() {
  if (props.mode === "preview") {
    emit("update:mode", "edit")
  } else {
    emit("update:mode", "preview")
  }
}

function openGitHub() {
  window.open("https://github.com/mishannn/plantuml-mobile-editor", "_blank");
}

const fileForOpen = ref()

function openFile(isActive) {
  emit("open", fileForOpen.value[0])
  isActive.value = false
}

const downloadButtonIcon = navigator.share ? "mdi-share-variant" : "mdi-download"
const downloadButtonLabel = navigator.share ? "Share" : "Download"

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
