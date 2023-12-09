import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 800,
  viewportHeight: 1000,
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
