/**
 * @file src/stores/shipmentStore.spec.ts
 * @description Unit test suite for the Pinia shipment store.
 * This file uses Vitest to test the store's state, getters, and actions in isolation,
 * ensuring the business logic works as expected. Axios is mocked to prevent actual
 * network requests during testing.
 * @version 1.0.0
 * @date 2025-07-11
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShipmentStore } from './shipmentStore';
import axios from 'axios';
import type { Shipment } from '../types';

// Mock the entire axios module. This intercepts any call to axios and allows us
// to define a fake implementation for its methods (e.g., get, patch).
vi.mock('axios');

/**
 * Test suite for the main shipment store.
 */
describe('Shipment Store', () => {
  // A consistent set of mock shipment data used across multiple tests.
  const mockShipments: Shipment[] = [
    { id: 'SH001', origin: 'Jakarta', destination: 'Surabaya', status: 'Assigned', transporter: 'JNE Express', vehicleType: 'Truk Fuso', distance: '784 km', estimatedDelivery: '2025-07-12' },
    { id: 'SH002', origin: 'Bandung', destination: 'Yogyakarta', status: 'Not Assigned', transporter: null, vehicleType: 'Truk CDD', distance: '428 km', estimatedDelivery: '2025-07-13' },
  ];

  /**
   * This hook runs before each individual test case (`it` block).
   * It ensures that every test starts with a clean slate by creating a fresh Pinia
   * instance and resetting all mocks. This prevents state from one test leaking into another.
   */
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  /**
   * Test case 1: Verifies that the store is created with the correct default values.
   */
  it('should have a correct initial state', () => {
    // ARRANGE & ACT: Create an instance of the store.
    const store = useShipmentStore();

    // ASSERT: Check if the initial state values match the defaults.
    expect(store.shipments).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.pollingIntervalId).toBeNull();
  });

  /**
   * Test case 2: Verifies the `fetchShipments` action on a successful API call.
   */
  it('should fetch shipments and update the state on success', async () => {
    // ARRANGE: Create the store and mock a successful API response from axios.
    const store = useShipmentStore();
    (axios.get as any).mockResolvedValue({ data: { shipments: mockShipments } });

    // ACT: Call the action to be tested.
    await store.fetchShipments();

    // ASSERT: Verify that the store's state was updated with the fetched data.
    expect(store.shipments).toEqual(mockShipments);
    expect(store.totalShipments).toBe(2); // Also test a getter
    expect(store.error).toBeNull();
  });

  /**
   * Test case 3: Verifies the `assignTransporter` action.
   */
  it('should assign a transporter to a shipment and update the state', async () => {
    // ARRANGE: Set up the store with initial data and mock the PATCH request.
    const store = useShipmentStore();
    const shipmentToUpdateId = 'SH002';
    const newTransporter = 'SiCepat Ekspres';
    store.shipments = [...mockShipments]; // Set initial state

    const updatedShipmentData = {
      ...mockShipments[1],
      status: 'Assigned',
      transporter: newTransporter,
    };
    (axios.patch as any).mockResolvedValue({ data: { shipment: updatedShipmentData } });

    // ACT: Call the `assignTransporter` action.
    await store.assignTransporter(shipmentToUpdateId, newTransporter);

    // ASSERT: Check that the specific shipment was updated correctly in the store's state.
    const updatedShipment = store.getShipmentById(shipmentToUpdateId);
    expect(updatedShipment).toBeDefined();
    expect(updatedShipment?.status).toBe('Assigned');
    expect(updatedShipment?.transporter).toBe(newTransporter);
    expect(store.assignedShipments).toBe(2); // Verify getter logic
    expect(store.error).toBeNull();
  });

   /**
    * Test case 4: Verifies that the store correctly handles API errors.
    */
  it('should set an error message if fetching shipments fails', async () => {
    // ARRANGE: Create the store and mock a failed API response.
    const store = useShipmentStore();
    (axios.get as any).mockRejectedValue(new Error('Network Error'));

    // ACT: Call the action.
    await store.fetchShipments();

    // ASSERT: Verify that the `error` state is set and the shipments array remains empty.
    expect(store.shipments).toEqual([]);
    expect(store.error).toBe('Failed to fetch shipments.');
  });
});
/**
 * This test suite covers the main functionalities of the shipment store,
 * including state initialization, data fetching, transporter assignment,
 * and error handling. Each test is isolated to ensure that it does not
 * interfere with others, providing a reliable and maintainable test suite.
 */