<template>
  <div class="mb-8">
    <!-- Back Button -->
    <button @click="goBack" class="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Back to List
    </button>
    
    <!-- Title and Subtitle -->
    <h1 class="text-3xl font-bold text-gray-800">Shipment {{ shipmentId }}</h1>
    <p class="text-gray-600">View and manage shipment information</p>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentDetailHeader.vue
 * @description Displays the header for the shipment detail page, including a back button and the shipment ID.
 * @version 1.0.0
 * @date 2025-07-11
 */
import { useRouter } from 'vue-router';

/**
 * Defines the props accepted by the component.
 * @property {string} shipmentId - The unique identifier of the shipment, passed from the parent component to be displayed in the header.
 */
defineProps<{
  shipmentId: string;
}>();

// Initialize the Vue Router instance to handle navigation.
const router = useRouter();

/**
 * goBack
 * @function goBack
 * @returns {void}
 * @description Navigates the user to the previous page in the browser's history stack.
 * This provides a standard "back" functionality.
 */
const goBack = () => {
  router.back();
};
</script>