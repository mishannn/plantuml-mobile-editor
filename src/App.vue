<template>
  <v-app>
    <AppBar v-model:mode="mode" @download="download" @open="openFile" />
    <v-main style="display: flex; flex-direction: column;">
      <KeepAlive>
        <v-ace-editor v-if="mode == 'edit'" v-model:value="code" theme="chrome" style="flex: 1 0 auto" />
      </KeepAlive>
      <KeepAlive>
        <Diagram v-if="mode == 'preview'" :code="code" v-model:image="image" style="flex: 1 0 auto" />
      </KeepAlive>
    </v-main>
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

const mode = ref("edit"); // or preview

const localStorageKey = "puml_code";
const lastCode = localStorage.getItem(localStorageKey);
const code = ref(lastCode || exampleCode);
watch(code, (newCode) => {
  localStorage.setItem(localStorageKey, newCode);
});

const image = ref();

async function download({ downloadType, downloadName }) {
  if (downloadType == "code") {
    const file = new File([code.value], `${downloadName || "diagram"}.puml`, {
      type: "text/plain;charset=utf-8",
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: downloadName,
          files: [file]
        })
      } else {
        saveAs(file);
      }
    } catch (e) {
      alert(`can't share or download file: ${e.message}`)
    }

    return;
  }

  if (downloadType == "image") {
    if (!image.value) {
      alert("Image isn't ready yet")
      return;
    }

    const file = new File([image.value], `${downloadName || "diagram"}.png`, {
      type: "image/png",
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: downloadName,
          files: [file]
        })
      } else {
        saveAs(file);
      }
    } catch (e) {
      alert(`can't share or download file: ${e.message}`)
    }

    return;
  }
}

async function openFile(file) {
  code.value = await file.text()
}
</script>
