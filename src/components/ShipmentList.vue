<template>
  <div>
    <!-- Page Header: Provides context for the user -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Shipment Dashboard</h1>
      <p class="text-gray-600">Overview of all active shipments.</p>
    </header>

    <!-- 
      Statistics Display: A child component that receives aggregated data as props.
      This keeps the main component cleaner by delegating the display logic.
    -->
    <ShipmentStats
      :total="totalShipments"
      :assigned="assignedShipments"
      :not-assigned="notAssignedShipments"
    />

    <!-- Main Content Container -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">All Shipments</h2>
      </div>

      <!-- 
        Conditional Rendering Block: Manages the display for different data states.
        This provides a clear user experience for loading, error, and empty states.
      -->
      <!-- 1. Loading State: Shown only on the initial load when the shipments array is empty. -->
      <div v-if="isLoading && shipments.length === 0" class="text-center p-10 text-gray-500">
        Loading shipments...
      </div>
      <!-- 2. Error State: Shown if the data fetch fails. Includes a retry button for better UX. -->
      <div v-else-if="error" class="text-center p-10 text-red-600">
        <p><strong>Error:</strong> {{ error }}</p>
        <button @click="retryFetch" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Try Again
        </button>
      </div>
      <!-- 3. Data Available State: Renders the child components for desktop and mobile views. -->
      <div v-else-if="shipments.length > 0">
        <ShipmentTable :shipments="shipments" />
        <ShipmentCardList :shipments="shipments" />
      </div>
      <!-- 4. Empty State: Shown if the fetch is successful but returns no data. -->
      <div v-else class="text-center p-10 text-gray-500">
        No active shipments found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentList.vue
 * @description This component serves as the main dashboard page. It acts as a "container"
 * component, responsible for fetching shipment data from the Pinia store, managing
 * loading and error states, and orchestrating the display of data through child components.
 * @version 1.0.0
 * @date 2025-07-11
 */
import { onMounted, onUnmounted } from 'vue';
import { useShipmentStore } from '../stores/shipmentStore';
import { storeToRefs } from 'pinia';

// Import child presentational components
import ShipmentStats from './ShipmentStats.vue';
import ShipmentTable from './ShipmentTable.vue';
import ShipmentCardList from './ShipmentCardList.vue';

// --- Store and State Management ---

// Initialize the Pinia store to manage shipment data.
const shipmentStore = useShipmentStore();

// Use storeToRefs to extract state and getters from the store while keeping them reactive.
// This allows the component to update automatically when the store's state changes.
const {
  shipments,
  isLoading,
  error,
  totalShipments,
  assignedShipments,
  notAssignedShipments,
} = storeToRefs(shipmentStore);


// --- Methods ---

/**
 * Triggers a refetch of the shipment data by calling the store action.
 * This is used for the "Try Again" button in the error state.
 */
const retryFetch = () => {
  shipmentStore.fetchShipments();
};


// --- Lifecycle Hooks ---

/**
 * The onMounted hook runs when the component is first added to the DOM.
 * It's used here to fetch the initial data and start the real-time update polling.
 */
onMounted(() => {
  // Optimization: Only fetch the initial list if the store is empty.
  // This prevents a redundant API call when navigating back from a detail page.
  if (shipmentStore.shipments.length === 0) {
    shipmentStore.fetchShipments();
  }
  
  // Always start polling for real-time updates when this page is active.
  shipmentStore.startRealtimeUpdates();
});

/**
 * The onUnmounted hook runs just before the component is removed from the DOM.
 * It's crucial for cleanup tasks, like stopping the polling interval to prevent memory leaks.
 */
onUnmounted(() => {
  shipmentStore.stopRealtimeUpdates();
});
</script>
