<template>
  <div class="plantuml-diagram">
    <div class="plantuml-diagram__progress-container" v-if="loading">
      <v-progress-circular indeterminate />
    </div>
    <div v-else-if="error" class="plantuml-diagram__error-container">
      <v-alert :text="error.message" type="error" />
    </div>
    <ol-map
      v-else
      class="plantuml-diagram__openlayers"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px"
    >
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-zoom-control />
      <ol-attribution-control />
      <ol-image-layer id="xkcd">
        <ol-source-image-static
          :url="imgUrl"
          :imageSize="size"
          :imageExtent="extent"
          :projection="projection"
          :attributions="imgCopyright"
        ></ol-source-image-static>
      </ol-image-layer>
    </ol-map>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { watch } from "vue";
import { reactive } from "vue";
import { ref } from "vue";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const imgCopyright = ref('© <a href="https://plantuml.com/">PlantUML</a>');
const imgUrl = ref("");
const size = ref([0, 0]);

const zoom = ref(1);
const rotation = ref(0);

const center = ref([size.value[0] / 2, size.value[1] / 2]);
watch(size, (newSize) => {
  center.value = [newSize[0] / 2, newSize[1] / 2];
});

const extent = computed(() => [0, 0, ...size.value]);
const projection = reactive({
  code: "image",
  units: "pixels",
  extent: extent,
});

async function getImageSize(blob) {
  const bmp = await createImageBitmap(blob);
  const { width, height } = bmp;
  bmp.close(); // free memory

  return [width, height];
}

async function storeImage(blob) {
  size.value = await getImageSize(blob);
  imgUrl.value = window.URL.createObjectURL(blob);
}

const loading = ref(true);
const error = ref();

function setupWatcher() {
  watch(
    () => props.code,
    (code) => {
      loading.value = true;
      error.value = undefined;

      plantuml
        .renderPng(code)
        .then((blob) => {
          storeImage(blob);
          loading.value = false;
        })
        .catch((err) => {
          error.value = err;
          loading.value = false;
        });
    },
    { immediate: true }
  );
}

const pathname = window.location.pathname.match(/^.*[\/]/)[0]

plantuml
  .initialize("/app" + pathname + "plantuml-wasm")
  .then(() => {
    setupWatcher();
  })
  .catch((err) => {
    error.value = err;
    loading.value = false;
  });
</script>

<style lang="scss">
.plantuml-diagram {
  display: flex;
  flex-direction: column;

  &__progress-container {
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__error-container {
    padding: 16px;
  }

  &__openlayers {
    flex: 1 0 auto;
  }
}
</style>
