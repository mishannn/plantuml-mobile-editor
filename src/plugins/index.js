/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import OpenLayersMap from "vue3-openlayers";

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(OpenLayersMap)
}
