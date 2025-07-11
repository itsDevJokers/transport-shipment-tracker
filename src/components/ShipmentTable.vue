<template>
  <!-- 
    The root container is hidden by default and only becomes a 'block' element on medium screens
    and larger ('md:block'). This makes the component exclusive to desktop-sized viewports.
    'overflow-x-auto' ensures the table can be scrolled horizontally on smaller desktop screens if needed.
  -->
  <div class="hidden md:block overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <!-- Shipment Table Header -->
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- 
          Iterate over the 'shipments' array passed in as a prop.
          Each shipment is rendered as a table row with a unique key.
        -->
        <tr v-for="shipment in shipments" :key="shipment.id" class="hover:bg-gray-50 transition-colors duration-200">
          
          <!-- Shipment ID Cell -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ shipment.id }}</div>
          </td>

          <!-- Route Information Cell -->
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900">
              <div class="font-medium" :title="shipment.origin">{{ shipment.origin }}</div>
              <div class="text-gray-500 flex items-center mt-1">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                <span :title="shipment.destination">{{ shipment.destination }}</span>
              </div>
            </div>
          </td>

          <!-- Shipment Status Cell -->
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="shipment.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'">
              {{ shipment.status }}
            </span>
          </td>

          <!-- Action Button Cell -->
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <router-link 
              :to="{ name: 'ShipmentDetail', params: { id: shipment.id } }" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              :aria-label="`View details for shipment ${shipment.id}`"
            >
              View Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentTable.vue
 * @description A presentational component that renders a list of shipments in a 
 * table format, designed specifically for desktop views.
 * @version 1.0.0
 * @date 2025-07-11
 */
import type { Shipment } from '../types';

/**
 * Defines the props accepted by the component.
 * @property {Shipment[]} shipments - An array of shipment objects to be displayed in the table.
 */
defineProps<{
  shipments: Shipment[];
}>();
</script>
