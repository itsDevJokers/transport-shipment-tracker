/**
 * @file src/components/ShipmentDetail.spec.ts
 * @description Component test suite for the ShipmentDetail.vue component.
 * This file uses Vitest and Vue Test Utils to test the UI interaction for assigning a transporter.
 * @version 1.0.0
 * @date 2025-07-11
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import { useShipmentStore } from '../stores/shipmentStore';
import ShipmentDetail from './ShipmentDetail.vue';
import type { Shipment } from '../types';

// --- Mocks ---

// Mock the entire 'vue-router' module to provide controlled implementations for its composables.
// This is necessary because the component internally calls useRouter().
vi.mock('vue-router', () => ({
  useRouter: () => ({
    back: vi.fn(), // Provide a mock function for router.back()
  }),
  // Provide a dummy implementation for the <router-link> component to prevent Vue warnings.
  RouterLink: {
    template: '<a><slot /></a>',
  },
}));

// --- Test Suite ---

describe('ShipmentDetail.vue', () => {
  // Define a sample "Not Assigned" shipment to be used as test data.
  const mockShipment: Shipment = {
    id: 'SH002',
    origin: 'Bandung, Jawa Barat',
    destination: 'Yogyakarta, DI Yogyakarta',
    status: 'Not Assigned',
    transporter: null,
    vehicleType: 'Truk CDD',
    distance: '428 km',
    estimatedDelivery: '2025-07-13',
  };

  // Declare a variable to hold the Pinia instance, accessible within the suite.
  let pinia: Pinia;

  /**
   * The beforeEach hook runs before each test case in this suite.
   * It ensures that each test runs in a clean, isolated environment by creating
   * a fresh Pinia instance.
   */
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  /**
   * Test case: Verifies that the correct store action is called when a user
   * selects a transporter and clicks the "Assign Transporter" button.
   */
  it('should call the assignTransporter action when a transporter is selected and the button is clicked', async () => {
    // --- ARRANGE ---
    // Set up the initial conditions for the test.

    // 1. Get the store instance associated with the active Pinia instance.
    const store = useShipmentStore();
    
    // 2. Pre-fill the store's state with the mock shipment data.
    //    This ensures the component renders the main detail view instead of the "not found" state.
    store.shipments = [mockShipment];

    // 3. Spy on the store's actions to track their calls without executing their original implementation (i.e., no real API calls).
    const assignActionSpy = vi.spyOn(store, 'assignTransporter').mockResolvedValue();
    vi.spyOn(store, 'fetchShipments').mockResolvedValue(); // Mock this to prevent calls from onMounted.

    // 4. Mount the component into a virtual DOM.
    const wrapper = mount(ShipmentDetail, {
      props: {
        id: mockShipment.id, // Pass the shipment ID as a prop.
      },
      global: {
        // Provide the same Pinia instance to the component to ensure it uses our pre-filled store.
        plugins: [pinia],
        // Stub the <router-link> component to avoid warnings in the test environment.
        stubs: {
          'router-link': true,
        },
      },
    });

    // --- ACT ---
    // Simulate user interactions.

    // 1. Find the necessary DOM elements.
    const transporterSelect = wrapper.find('select');
    const assignButton = wrapper.find('button.bg-blue-600'); // Use a specific class to target the correct button.
    const newTransporter = 'J&T Express';

    // 2. Simulate the user selecting an option from the dropdown and clicking the button.
    await transporterSelect.setValue(newTransporter);
    await assignButton.trigger('click');

    // --- ASSERT ---
    // Verify that the outcome of the interactions is as expected.

    // 1. Check that the `assignTransporter` action was called exactly once.
    expect(assignActionSpy).toHaveBeenCalledTimes(1);

    // 2. Check that the action was called with the correct arguments.
    expect(assignActionSpy).toHaveBeenCalledWith(mockShipment.id, newTransporter);

    // 3. Wait for the DOM to update and check if the success message is displayed.
    await wrapper.vm.$nextTick(); 
    expect(wrapper.html()).toContain('Transporter updated successfully!');
  });
});
/**
 * This test suite focuses on the ShipmentDetail component, specifically testing
 * the interaction of assigning a transporter to a shipment. It uses Vitest for
 * the testing framework and Vue Test Utils for mounting and interacting with the component.
 * The test ensures that the correct store action is called when a user selects a transporter
 * and clicks the "Assign Transporter" button.
 */