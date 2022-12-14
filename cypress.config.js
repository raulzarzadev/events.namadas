import admin from 'firebase-admin'
import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

import serviceAccount from 'serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    //  supportFile: 'cypress/support/e2e/index.js',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin)
      // e2e testing node events setup code
    }
  }
})

export default cypressConfig
