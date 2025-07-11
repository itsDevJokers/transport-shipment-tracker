<template>
  <!-- 
    The root element of the application, styled to take up the full screen height
    and provide a consistent background color.
  -->
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- 
      The main application header. This is a reusable component that will be
      present on every page of the application.
    -->
    <Header />

    <!-- 
      The main content area of the application. The <main> tag is used for semantic HTML,
      improving accessibility. 'flex-grow' ensures it takes up all available space.
    -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <!--
        The <router-view> is the placeholder where Vue Router will render the
        component corresponding to the current URL.
      -->
      <router-view v-slot="{ Component, route }">
        <!-- 
          The <transition> component provides a smooth fade effect when navigating
          between pages, which enhances the user experience.
        -->
       <transition name="fade" mode="out-in">
          <div :key="route.name?.toString()">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * @file App.vue
 * @description The root component and main layout of the application.
 * It provides the persistent structure, including the header and the main content area
 * where routed pages are displayed.
 * @version 1.0.0
 * @date 2025-07-11
 */

// Import the dedicated header component to be used in the template.
import Header from './components/Header.vue';
</script>

<style>
/* Defines the CSS for the page transition effect.
  This creates a smooth fade-in/fade-out when the user navigates between routes.
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
