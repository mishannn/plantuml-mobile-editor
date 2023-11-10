<template>
  <v-app>
    <AppBar @download="download" @open="openFile" />
    <v-main>
      <KeepAlive>
        <v-ace-editor
          v-if="currentTab == 'code'"
          v-model:value="code"
          theme="chrome"
          style="height: 100%"
        />
      </KeepAlive>
      <KeepAlive>
        <Diagram
          v-if="currentTab == 'preview'"
          :code="code"
          v-model:image="image"
          style="height: 100%"
        />
      </KeepAlive>
    </v-main>
    <BottomMenu v-model:model-value="currentTab" />
  </v-app>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import { ref } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import Diagram from "./components/Diagram.vue";
import { watch } from "vue";

const exampleCode = `@startuml
' hide the spot
' hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "Entity01" as e01 {
  *e1_id : number <<generated>>
  --
  *name : text
  description : text
}

entity "Entity02" as e02 {
  *e2_id : number <<generated>>
  --
  *e1_id : number <<FK>>
  other_details : text
}

entity "Entity03" as e03 {
  *e3_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}

entity "Entity04" as e04 {
  *e4_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}

e01 ||..o{ e02
e01 |o..o{ e03
e01 |o..o{ e04
@enduml`;

const currentTab = ref("code");

const localStorageKey = "puml_code";
const lastCode = localStorage.getItem(localStorageKey);
const code = ref(lastCode || exampleCode);
watch(code, (newCode) => {
  localStorage.setItem(localStorageKey, newCode);
});

const image = ref();

function download({ downloadType, downloadName }) {
  if (downloadType == "code") {
    const file = new File([code.value], `${downloadName || "diagram"}.puml`, {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file);
    return;
  }

  if (downloadType == "image") {
    const file = new File([image.value || ""], `${downloadName || "diagram"}.png`, {
      type: "image/png",
    });
    saveAs(file);
    return;
  }
}

async function openFile(file) {
  code.value = await file.text()
}
</script>
