/**
 * @file src/stores/shipmentStore.ts
 * @description Pinia store for managing the application's global shipment state.
 * This store handles fetching data, updating state, and providing computed values (getters).
 * It is the single source of truth for all shipment-related data.
 * @version 1.0.0
 * @date 2025-07-11
 */

import { defineStore } from 'pinia';
import axios from 'axios';
import type { Shipment } from '../types';

/**
 * Defines the shape of the shipment store's state.
 * @interface State
 * @property {Shipment[]} shipments - An array holding all the shipment objects.
 * @property {boolean} isLoading - A flag to indicate when an API request is in progress.
 * @property {string | null} error - Holds an error message if an API request fails.
 * @property {number | null} pollingIntervalId - Stores the ID of the setInterval used for real-time updates, allowing it to be cleared later.
 */
interface State {
  shipments: Shipment[];
  isLoading: boolean;
  error: string | null;
  pollingIntervalId: number | null;
}

/**
 * The main Pinia store for shipments.
 * The first argument 'shipments' is the unique ID of the store.
 */
export const useShipmentStore = defineStore('shipments', {
  /**
   * Defines the initial state of the store.
   * @returns {State} The initial state object.
   */
  state: (): State => ({
    shipments: [],
    isLoading: false,
    error: null,
    pollingIntervalId: null,
  }),

  /**
   * Getters are synchronous computed properties derived from the store's state.
   */
  getters: {
    totalShipments: (state) => state.shipments.length,
    assignedShipments: (state) => state.shipments.filter(s => s.status === 'Assigned').length,
    notAssignedShipments: (state) => state.shipments.filter(s => s.status === 'Not Assigned').length,
    /**
     * A getter that returns a function to find a shipment by its ID.
     * @param {State} state - The store's state.
     * @returns {(id: string) => Shipment | undefined} A function that takes an ID and returns the corresponding shipment or undefined.
     */
    getShipmentById: (state) => {
      return (id: string) => state.shipments.find(s => s.id === id);
    },
  },

  /**
   * Actions are methods that can be asynchronous and are used to modify the state.
   */
  actions: {
    /**
     * Fetches the complete list of shipments from the mock API.
     */
    async fetchShipments() {
      // Only show the main loading indicator on the initial fetch when the list is empty.
      // This prevents the UI from flickering during background polling.
      if (this.shipments.length === 0) {
        this.isLoading = true;
      }
      this.error = null;
      try {
        const response = await axios.get('/api/shipments');
        this.shipments = response.data.shipments;
      } catch (error) {
        this.error = 'Failed to fetch shipments.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Assigns a transporter to a specific shipment and updates its status.
     * @param {string} shipmentId - The ID of the shipment to update.
     * @param {string} transporter - The name of the transporter to assign.
     */
    async assignTransporter(shipmentId: string, transporter: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.patch(`/api/shipments/${shipmentId}`, {
          transporter,
          status: 'Assigned',
        });
        
        // Find and update the local shipment to reflect the change immediately
        // without needing a full refetch. This is an optimistic update.
        const index = this.shipments.findIndex(s => s.id === shipmentId);
        if (index !== -1) {
          this.shipments[index] = response.data.shipment;
        }
      } catch (error) {
        this.error = 'Failed to assign transporter.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Starts a polling mechanism to simulate real-time updates by fetching
     * shipment data at a regular interval.
     */
    startRealtimeUpdates() {
      // Prevent multiple intervals from running simultaneously.
      if (this.pollingIntervalId) return;

      console.log('[Pinia] Starting real-time updates...');
      this.pollingIntervalId = window.setInterval(() => {
        this.fetchShipments();
      }, 5000); // Poll for new data every 5 seconds.
    },

    /**
     * Stops the real-time update polling. This is a crucial cleanup step
     * to prevent memory leaks when a component is unmounted.
     */
    stopRealtimeUpdates() {
      if (this.pollingIntervalId) {
        console.log('[Pinia] Stopping real-time updates...');
        clearInterval(this.pollingIntervalId);
        this.pollingIntervalId = null;
      }
    },
  },
});
