/**
 * @file src/router/index.ts
 * @description Vue Router configuration for the application.
 * This file defines all the client-side routes, mapping URL paths to their
 * corresponding Vue components.
 * @version 1.0.0
 * @date 2025-07-11
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
// Import the page/view components that will be used in the routes.
import ShipmentDetail from '../components/ShipmentDetail.vue';
import ShipmentList from '../components/ShipmentList.vue';

/**
 * An array of route records that defines the application's navigation structure.
 * @type {RouteRecordRaw[]}
 */
const routes: readonly RouteRecordRaw[] = [
  {
    // The root path of the application, which serves as the homepage.
    path: '/',
    name: 'ShipmentList', // The unique name for this route, used for programmatic navigation.
    component: ShipmentList, // The component to render for this route.
  },
  {
    // A dynamic route for displaying the details of a single shipment.
    // The ':id' segment is a dynamic parameter that will match any string,
    // representing the unique ID of a shipment.
    path: '/shipment/:id',
    name: 'ShipmentDetail',
    component: ShipmentDetail,
    // When `props` is set to `true`, the route parameter (e.g., `id`) will be
    // automatically passed as a prop to the `ShipmentDetail` component.
    // This decouples the component from the router, making it easier to test.
    props: true,
  },
];

/**
 * The main router instance for the application.
 */
const router = createRouter({
  /**
   * `createWebHistory()` enables HTML5 history mode, which uses the browser's
   * History API to achieve clean URLs (e.g., `/shipment/SH001`) without a hash (#).
   */
  history: createWebHistory(import.meta.env.BASE_URL),

  /**
   * The array of route definitions.
   */
  routes,
});

export default router;
