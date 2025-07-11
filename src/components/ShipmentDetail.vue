<template>
  <!-- Main container with conditional rendering for loading/error states -->
  <div>
    <!-- Loading State: Displayed while fetching data and the shipment is not yet available -->
    <div v-if="isLoading && !shipment" class="text-center py-12 text-gray-500">
      Loading shipment details...
    </div>

    <!-- Error State: Displayed if the data fetch fails -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      <p><strong>Error:</strong> {{ error }}</p>
    </div>

    <!-- Not Found State: Displayed if the shipment ID from the URL does not exist -->
    <div v-else-if="!shipment" class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-700">Shipment not found.</h1>
      <router-link :to="{ name: 'ShipmentList' }" class="text-blue-600 hover:underline mt-4 inline-block">
        Back to Shipment List
      </router-link>
    </div>

    <!-- Main Detail View (renders only when shipment data is available) -->
    <div v-else>
      <!-- Child Components for displaying details -->
      <ShipmentDetailHeader :shipment-id="shipment.id" />
      <ShipmentStatusCard :shipment="shipment" />

      <!-- Main content grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Route Information Card -->
        <div class="bg-white rounded-lg shadow-lg">
          <div class="px-6 py-4 bg-blue-50 border-b"><h3 class="text-lg font-semibold">Route Information</h3></div>
          <div class="p-6 space-y-6">
            <div class="flex items-start"><div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full mt-1 mr-4"></div><div><label class="block text-sm font-medium">Origin</label><p class="text-base">{{ shipment.origin }}</p></div></div>
            <div class="flex items-center ml-2"><div class="w-0.5 h-8 bg-gray-300"></div><div class="ml-4 text-sm text-gray-500">{{ shipment.distance }}</div></div>
            <div class="flex items-start"><div class="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full mt-1 mr-4"></div><div><label class="block text-sm font-medium">Destination</label><p class="text-base">{{ shipment.destination }}</p></div></div>
          </div>
        </div>

        <!-- Vehicle & Transporter Info Column -->
        <div class="space-y-8">
          <!-- Vehicle Info Card -->
          <div class="bg-white rounded-lg shadow-lg"><div class="px-6 py-4 bg-green-50 border-b"><h3 class="text-lg font-semibold">Vehicle Information</h3></div><div class="p-6"><label class="block text-sm font-medium mb-2">Vehicle Type</label><p class="font-medium">{{ shipment.vehicleType }}</p></div></div>
          
          <!-- Transporter Assignment Card -->
          <div class="bg-white rounded-lg shadow-lg"><div class="px-6 py-4 bg-orange-50 border-b"><h3 class="text-lg font-semibold">Transporter Assignment</h3></div>
            <div class="p-6 space-y-4">
              <div><label class="block text-sm font-medium text-gray-700">Current Transporter:</label><p class="font-medium text-lg">{{ shipment.transporter || 'Not Assigned' }}</p></div>
              <select v-model="selectedTransporter" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select a new transporter...</option><option v-for="t in transporters" :key="t" :value="t">{{ t }}</option></select>
              <button @click="handleAssignTransporter" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">Assign Transporter</button>
              <div v-if="message" :class="message.type" class="p-4 rounded-lg text-sm">{{ message.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ShipmentDetail.vue
 * @description This component serves as the detail page for a single shipment.
 * It fetches data from the Pinia store based on the route parameter and orchestrates
 * the display of various details through child components. It also handles the logic
 * for assigning a transporter and manages real-time updates.
 * @version 1.0.0
 * @date 2025-07-11
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useShipmentStore } from '../stores/shipmentStore';
import { storeToRefs } from 'pinia';

// Import child components
import ShipmentDetailHeader from './ShipmentDetailHeader.vue';
import ShipmentStatusCard from './ShipmentStatusCard.vue';

// --- Component Setup ---

/**
 * Defines the props accepted by the component.
 * @property {string} id - The unique identifier of the shipment, passed from Vue Router as a route parameter.
 */
const props = defineProps<{ id: string }>();
const shipmentStore = useShipmentStore();

// --- State and Getters from Pinia Store ---

// Use storeToRefs to get isLoading and error while keeping them reactive.
const { isLoading, error } = storeToRefs(shipmentStore);
// Get a specific shipment using a getter. This computed property will reactively update
// if the underlying store state changes (e.g., from polling).
const shipment = computed(() => shipmentStore.getShipmentById(props.id));

// --- Local Component State for UI ---

// Holds the value of the selected transporter from the dropdown.
const selectedTransporter = ref('');
// Holds the success or error message displayed to the user after an action.
const message = ref<{ text: string, type: string } | null>(null);
// A static list of available transporters for the assignment dropdown.
const transporters = ref([
  'JNE Express', 'J&T Express', 'SiCepat Ekspres', 'Ninja Xpress',
  'Pos Indonesia', 'TIKI', 'Wahana Express', 'GoSend Logistics',
  'Lalamove', 'Deliveree'
]);

// --- Methods ---

/**
 * Handles the logic for assigning a new transporter to the current shipment.
 * It validates the selection and calls the corresponding Pinia store action.
 */
const handleAssignTransporter = async () => {
  if (!selectedTransporter.value) {
    message.value = { text: 'Please select a transporter first.', type: 'bg-red-100 text-red-700' };
    return;
  }
  
  // Call the store action to perform the update via API.
  await shipmentStore.assignTransporter(props.id, selectedTransporter.value);

  // Display a success or error message based on the result of the store action.
  if (shipmentStore.error) {
    message.value = { text: shipmentStore.error, type: 'bg-red-100 text-red-700' };
  } else {
    message.value = { text: 'Transporter updated successfully!', type: 'bg-green-100 text-green-700' };
    selectedTransporter.value = ''; // Clear selection after successful assignment.
  }
};

// --- Lifecycle Hooks ---

onMounted(() => {
  // If the shipment data isn't already in the store (e.g., user lands directly on this page), fetch it.
  if (!shipment.value) {
    shipmentStore.fetchShipments();
  }
  // Start the real-time update polling mechanism for this page.
  shipmentStore.startRealtimeUpdates();
});

onUnmounted(() => {
  // Stop the real-time update polling when the user navigates away from this page to prevent memory leaks.
  shipmentStore.stopRealtimeUpdates();
});
</script>
