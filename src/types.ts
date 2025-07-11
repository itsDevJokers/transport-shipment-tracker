/**
 * @file types.ts
 * @description This file contains shared TypeScript interfaces and type definitions
 * used throughout the application. Centralizing types here ensures consistency
 * and provides a single source of truth for data structures.
 * @version 1.0.0
 * @date 2025-07-11
 */

/**
 * Represents the structure of a single shipment object.
 * This interface is used by the Pinia store, API responses (MirageJS),
 * and Vue components to ensure type safety.
 *
 * @interface Shipment
 */
export interface Shipment {
  /**
   * The unique identifier for the shipment (e.g., 'SH001').
   * @type {string}
   */
  id: string;

  /**
   * The starting point of the shipment, including detailed address information.
   * @type {string}
   * @example 'Kel. Menteng, Kec. Menteng, Jakarta Pusat, DKI Jakarta'
   */
  origin: string;

  /**
   * The final destination of the shipment, including detailed address information.
   * @type {string}
   * @example 'Kel. Gubeng, Kec. Gubeng, Surabaya, Jawa Timur'
   */
  destination: string;

  /**
   * The current status of the shipment. Can only be one of two specific string values.
   * @type {'Assigned' | 'Not Assigned'}
   */
  status: 'Assigned' | 'Not Assigned';

  /**
   * The name of the logistics company assigned to handle the shipment.
   * It is `null` if no transporter has been assigned yet.
   * @type {string | null}
   */
  transporter: string | null;

  /**
   * The type of vehicle used for the shipment (e.g., 'Truk Fuso').
   * @type {string}
   */
  vehicleType: string;

  /**
   * The total travel distance for the shipment route.
   * @type {string}
   * @example '784 km'
   */
  distance: string;

  /**
   * The estimated date of delivery in YYYY-MM-DD format.
   * @type {string}
   * @example '2025-07-12'
   */
  estimatedDelivery: string;
}
