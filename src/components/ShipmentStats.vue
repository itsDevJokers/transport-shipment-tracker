<template>
  <!-- 
    The main container for the statistics cards.
    It uses a CSS grid layout that displays as a single column on mobile 
    and a three-column grid on medium screens and larger ('md:grid-cols-3').
  -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    
    <!-- Total Shipments Card -->
    <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <p class="text-sm font-medium text-gray-600">Total Shipments</p>
      <p class="text-2xl font-bold text-gray-900">{{ total }}</p>
    </div>
    
    <!-- Assigned Shipments Card -->
    <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <p class="text-sm font-medium text-gray-600">Assigned</p>
      <p class="text-2xl font-bold text-gray-900">{{ assigned }}</p>
    </div>
    
    <!-- Not Assigned Shipments Card -->
    <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
      <p class="text-sm font-medium text-gray-600">Not Assigned</p>
      <p class="text-2xl font-bold text-gray-900">{{ notAssigned }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentStats.vue
 * @description A presentational component that displays a set of summary statistics
 * for shipments in styled cards. It receives all data via props.
 * @version 1.0.0
 * @date 2025-07-11
 */

/**
 * Defines the props accepted by the component.
 * These values are passed down from a parent component (e.g., ShipmentList).
 * * @property {number} total - The total number of shipments.
 * @property {number} assigned - The number of shipments that have been assigned a transporter.
 * @property {number} notAssigned - The number of shipments that have not yet been assigned.
 */
defineProps<{
  total: number;
  assigned: number;
  notAssigned: number;
}>();
</script>
