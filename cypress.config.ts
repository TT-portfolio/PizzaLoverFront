import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    defaultCommandTimeout: 20000, // Timeout på 10 sekunder
    requestTimeout: 20000, // Timeout för API-anrop
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
