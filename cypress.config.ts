import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://nice-field-0563ff303.4.azurestaticapps.net",
    defaultCommandTimeout: 20000,  // Timeout på 10 sekunder
    requestTimeout: 20000,  // Timeout för API-anrop
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
