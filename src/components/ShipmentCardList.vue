<template>
  <div class="md:hidden">
    <div
      v-for="shipment in shipments"
      :key="shipment.id"
      class="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200"
    >
      <div class="flex justify-between items-start mb-3">
        <div class="font-semibold text-gray-900">{{ shipment.id }}</div>
        <span
          class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
          :class="shipment.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'"
        >
          {{ shipment.status }}
        </span>
      </div>

      <div class="text-sm text-gray-600 mb-4">
        <div class="mb-1 truncate" :title="shipment.origin">{{ shipment.origin }}</div>
        <div class="flex items-center text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <span class="truncate" :title="shipment.destination">{{ shipment.destination }}</span>
        </div>
      </div>

      <router-link
        :to="{ name: 'ShipmentDetail', params: { id: shipment.id } }"
        class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        aria-label="View details for shipment {{ shipment.id }}"
      >
        View Details
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentCardList.vue
 * @description Renders a list of shipments as individual cards, designed for mobile views.
 * This is a presentational component that receives its data via props.
 * @version 1.0.0
 * @date 2025-07-11
 */
import type { Shipment } from '../types';

/**
 * Defines the props accepted by the component.
 * @property {Shipment[]} shipments - An array of shipment objects to be displayed.
 */
defineProps<{
  shipments: Shipment[];
}>();
</script>
