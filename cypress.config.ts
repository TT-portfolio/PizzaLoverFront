import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/",
    defaultCommandTimeout: 20000,  // Timeout på 10 sekunder
    requestTimeout: 20000,  // Timeout för API-anrop
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
