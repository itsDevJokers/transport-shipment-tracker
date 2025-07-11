<template>
  <!-- 
    The main header element. 
    'sticky top-0 z-10' makes the header stay at the top of the viewport when scrolling.
  -->
  <header class="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        
        <!-- 
          The main logo and title area, wrapped in a router-link to navigate to the homepage ('/').
          'group' is used to apply hover effects to child elements (the icon background).
          'aria-label' improves accessibility for screen reader users.
        -->
        <router-link to="/" class="flex items-center cursor-pointer group" aria-label="Go to Homepage">
          <div class="flex-shrink-0 flex items-center">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-700 transition-colors duration-300">
              <!-- A truck icon provides better context for a logistics application. -->
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">TransportTracker</h1>
              <p class="text-xs text-gray-500">Shipment Management System</p>
            </div>
          </div>
        </router-link>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * @file Header.vue
 * @description A reusable header component for the application. It is present on all pages
 * and displays the application logo and title, which serves as a link back to the homepage.
 * This component is purely presentational and contains no business logic.
 * @version 1.0.0
 * @date 2025-07-11
 */
</script>
