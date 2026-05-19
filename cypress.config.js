const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "g93mof",
  e2e: {
    baseUrl: "https://r1036223-realbeans.myshopify.com",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});