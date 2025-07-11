/**
 * @file main.ts
 * @description The main entry point for the Vue application.
 * This file is responsible for initializing the Vue app, setting up essential plugins like
 * Pinia (for state management) and Vue Router (for navigation), and mounting the root
 * component to the DOM. It also conditionally initializes the MirageJS mock API server
 * for development purposes.
 * @version 1.0.0
 * @date 2025-07-11
 */

// --- Core and Plugin Imports ---
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// --- Local Application Module Imports ---
import App from './App.vue';
import router from './router';
import { makeServer } from './server';
import './style.css'; // Import global application styles

// --- Mock API Server Initialization ---
// Conditionally create the MirageJS server only when the application is running
// in 'development' mode. This ensures the mock server is not included in the
// final production build, keeping it lightweight.
if (import.meta.env.MODE === 'development') {
  makeServer();
}

// --- Vue Application Initialization ---

// 1. Create the root Vue application instance from the App component.
const app = createApp(App);

// 2. Create a Pinia instance. This will be the root of the state management system.
const pinia = createPinia();

// 3. Register the plugins with the Vue application instance.
//    - The router plugin enables client-side routing.
//    - The pinia plugin enables global state management.
app.use(router);
app.use(pinia);

// 4. Mount the application to the DOM.
//    The entire Vue app will be rendered inside the HTML element with id="app"
//    in the public/index.html file.
app.mount('#app');
