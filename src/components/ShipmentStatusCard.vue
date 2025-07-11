<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <!-- 
      Main container for the card content.
      - Mobile (default): Stacks items vertically (`flex-col`) and centers them (`items-center`).
      - Desktop (md:): Lays out items horizontally (`md:flex-row`) and pushes them to the edges (`md:justify-between`).
    -->
    <div class="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
      
      <!-- Status Section -->
      <!-- Aligns the text to the center on mobile and to the left on desktop (`md:text-left`). -->
      <div class="text-center md:text-left">
        <span class="text-sm text-gray-600">Status</span>
        <span 
          class="mt-1 flex justify-center px-3 py-1 text-sm font-semibold rounded-full" 
          :class="statusClass"
        >
          {{ shipment.status }}
        </span>
      </div>
      
      <!-- Estimated Delivery Section -->
      <!-- Aligns the text to the center on mobile and to the right on desktop (`md:text-right`). -->
      <div class="text-center md:text-right">
        <p class="text-sm text-gray-600">Estimated Delivery</p>
        <p class="text-lg font-semibold text-gray-900">{{ shipment.estimatedDelivery }}</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentStatusCard.vue
 * @description A presentational component that displays a summary card with the primary status
 * and estimated delivery date of a single shipment. It is designed to be responsive.
 * @version 1.0.0
 * @date 2025-07-11
 */
import { computed } from 'vue';
import type { Shipment } from '../types';

/**
 * Defines the props accepted by the component.
 * @property {Shipment} shipment - The full shipment object containing the data to be displayed.
 */
const props = defineProps<{
  shipment: Shipment;
}>();

/**
 * Computes the appropriate Tailwind CSS classes for the status badge based on the shipment's status.
 * @returns {string} A string of CSS classes ('bg-green-100 text-green-800' for 'Assigned',
 * or 'bg-orange-100 text-orange-800' for 'Not Assigned').
 */
const statusClass = computed(() => {
  return props.shipment.status === 'Assigned'
    ? 'bg-green-100 text-green-800'
    : 'bg-orange-100 text-orange-800';
});
</script>
