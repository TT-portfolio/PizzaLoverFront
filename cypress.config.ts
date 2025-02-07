import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
