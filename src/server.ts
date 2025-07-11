/**
 * @file server.ts
 * @description MirageJS Mock API Server configuration.
 * This file sets up a mock server that intercepts API requests during development,
 * allowing the frontend to be built and tested without a real backend. It defines
 * data models, seeds initial data, and specifies API route handlers.
 * @version 1.1.0
 * @date 2025-07-11
 */

import { createServer, Model, Factory } from 'miragejs';
import type { Shipment } from './types';

/**
 * A static list of Indonesian transporters used for seeding initial data
 * and for the real-time update simulation.
 */
const transporters: string[] = [
  'JNE Express', 'J&T Express', 'SiCepat Ekspres', 'Ninja Xpress',
  'Pos Indonesia', 'TIKI', 'Wahana Express', 'GoSend Logistics',
  'Lalamove', 'Deliveree'
];

/**
 * Creates and configures the MirageJS server instance.
 * @param {object} [options] - Configuration options for the server.
 * @param {string} [options.environment='development'] - The environment mode.
 * @returns The configured MirageJS server instance.
 */
export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    /**
     * Defines the data models for the mock database.
     * Each key represents a model type that Mirage will manage.
     */
    models: {
      shipment: Model.extend<Partial<Shipment>>({}),
    },

    /**
     * Factories are used to generate dynamic data for your models.
     * This is useful for creating multiple instances of a model easily.
     */
    factories: {
      shipment: Factory.extend<Partial<Shipment>>({
        // Default values for any shipment created via the factory.
        status: 'Not Assigned',
        transporter: null,
      }),
    },

    /**
     * The `seeds` function populates the mock database with initial data
     * when the server starts.
     * @param {Schema} server - The MirageJS server instance.
     */
    seeds(server) {
      server.create('shipment', {
        id: 'SH001',
        origin: 'Kel. Menteng, Kec. Menteng, Jakarta Pusat, DKI Jakarta',
        destination: 'Kel. Gubeng, Kec. Gubeng, Surabaya, Jawa Timur',
        status: 'Assigned',
        transporter: 'JNE Express', 
        vehicleType: 'Truk Fuso',
        distance: '784 km',
        estimatedDelivery: '2025-07-12',
      });
      server.create('shipment', {
        id: 'SH002',
        origin: 'Kel. Dago, Kec. Coblong, Bandung, Jawa Barat',
        destination: 'Kel. Wirogunan, Kec. Mergangsan, Yogyakarta, DI Yogyakarta',
        status: 'Not Assigned',
        transporter: null,
        vehicleType: 'Truk CDD',
        distance: '428 km',
        estimatedDelivery: '2025-07-13',
      });
      server.create('shipment', {
        id: 'SH003',
        origin: 'Kel. Petisah Tengah, Kec. Medan Petisah, Medan, Sumatera Utara',
        destination: 'Kel. 20 Ilir D-IV, Kec. Ilir Timur I, Palembang, Sumatera Selatan',
        status: 'Assigned',
        transporter: 'SiCepat Ekspres', 
        vehicleType: 'Kontainer 20ft',
        distance: '1,450 km',
        estimatedDelivery: '2025-07-15',
      });
      server.create('shipment', {
        id: 'SH004',
        origin: 'Kel. Losari, Kec. Ujung Pandang, Makassar, Sulawesi Selatan',
        destination: 'Kel. Wenang Utara, Kec. Wenang, Manado, Sulawesi Utara',
        status: 'Not Assigned',
        transporter: null,
        vehicleType: 'Truk Tronton',
        distance: '1,015 km',
        estimatedDelivery: '2025-07-16',
      });
      server.create('shipment', {
        id: 'SH005',
        origin: 'Kel. Sanur Kaja, Kec. Denpasar Selatan, Denpasar, Bali',
        destination: 'Kel. Kelapa Gading Barat, Kec. Kelapa Gading, Jakarta Utara, DKI Jakarta',
        status: 'Assigned',
        transporter: 'J&T Express', 
        vehicleType: 'Truk Fuso',
        distance: '1,189 km',
        estimatedDelivery: '2025-07-14',
      });
      server.create('shipment', {
        id: 'SH006',
        origin: 'Kel. Mugassari, Kec. Semarang Selatan, Semarang, Jawa Tengah',
        destination: 'Kel. Cihapit, Kec. Bandung Wetan, Bandung, Jawa Barat',
        status: 'Assigned',
        transporter: 'Pos Indonesia', 
        vehicleType: 'Van Gran Max',
        distance: '324 km',
        estimatedDelivery: '2025-07-11',
      });
      server.create('shipment', {
        id: 'SH007',
        origin: 'Kel. Rungkut Kidul, Kec. Rungkut, Surabaya, Jawa Timur',
        destination: 'Kel. Kuta, Kec. Kuta, Kab. Badung, Bali',
        status: 'Not Assigned',
        transporter: null,
        vehicleType: 'Truk CDD',
        distance: '430 km',
        estimatedDelivery: '2025-07-12',
      });
      server.create('shipment', {
        id: 'SH008',
        origin: 'Kel. Sosromenduran, Kec. Gedongtengen, Yogyakarta, DI Yogyakarta',
        destination: 'Kel. Cilandak Barat, Kec. Cilandak, Jakarta Selatan, DKI Jakarta',
        status: 'Assigned',
        transporter: 'TIKI', 
        vehicleType: 'Truk Wingbox',
        distance: '560 km',
        estimatedDelivery: '2025-07-13',
      });
    },

    /**
     * Defines the API route handlers that the server will intercept.
     */
    routes() {
      // All routes defined here will be prefixed with '/api'.
      this.namespace = 'api';

      // Handler for GET /api/shipments
      this.get('/shipments', (schema) => {
        return schema.all('shipment');
      });

      // Handler for GET /api/shipments/:id
      this.get('/shipments/:id', (schema, request) => {
        const id = request.params.id;
        return schema.find('shipment', id);
      });

      // Handler for PATCH /api/shipments/:id
      this.patch('/shipments/:id', (schema: any, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const shipment = schema.find('shipment', id);
        
        // Update the shipment record with the new attributes.
        return shipment?.update(attrs);
      });
    },
  });

  // --- Real-time Update Simulation ---
  // This interval simulates backend events by randomly updating a shipment's status.
  setInterval(() => {
    const unassignedShipments = server.schema.all('shipment').filter(s => s.status === 'Not Assigned');
    
    if (unassignedShipments.length > 0) {
      const randomShipment = unassignedShipments.models[Math.floor(Math.random() * unassignedShipments.length)];
      const randomTransporter = transporters[Math.floor(Math.random() * transporters.length)];

      randomShipment.update({
        status: 'Assigned',
        transporter: randomTransporter,
      });

      console.log(`[MirageJS] Simulated update: Shipment ${randomShipment.id} is now assigned to ${randomTransporter}.`);
    }
  }, 7000); // Simulate an update every 7 seconds.

  return server;
}


