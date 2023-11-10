<template>
  <v-bottom-navigation
    :model-value="props.modelValue"
    @update:model-value="changeTab"
    active
    color="primary"
  >
    <v-btn value="code">
      <v-icon>mdi-code-braces</v-icon>

      <span>Code</span>
    </v-btn>

    <v-btn value="preview">
      <v-icon>mdi-sitemap-outline</v-icon>

      <span>Diagram</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

function changeTab(tab) {
  if (!tab) {
    return
  }

  emit('update:modelValue', tab)
}
</script>
