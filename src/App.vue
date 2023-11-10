<template>
  <v-app>
    <AppBar />
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

const currentTab = ref("code");
const code = ref(`@startuml
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
@enduml`);
</script>
