# Transport Shipment Tracker

**Version**: 1.0.0

**Link URL**:

A modern, responsive, and real-time capable web application for tracking and managing transport shipments. Built with Vue 3, TypeScript, and Pinia, this project demonstrates professional front-end development practices, including a mock API for development, unit/component testing, and a clean, component-based architecture.

## Features

- Dashboard View: A comprehensive overview of all shipments with key statistics (Total, Assigned, Not Assigned).
- Shipment List: A responsive list displaying all shipments in a table format for desktop and a card format for mobile.
- Detailed View: A dedicated page for each shipment showing detailed route, vehicle, and transporter information.
- Transporter Assignment: Functionality to assign or update the transporter for any given shipment.
- Real-time Simulation: The application simulates real-time updates, where unassigned shipments are automatically assigned by a mock backend process, with changes reflected live in the UI.
- Responsive Design: The UI is fully responsive and optimized for a seamless experience on both desktop and mobile devices.

## Tech Stack

- Framework: [Vue 3](https://vuejs.org/) (with Composition API and <script setup>)
- Language: [TypeScript](https://www.typescriptlang.org/)
- State Management: [Pinia](https://pinia.vuejs.org/)
- Routing: [Vue Router](https://router.vuejs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Mock API: [MirageJS](https://miragejs.com/)
- HTTP Client: [Axios](https://axios-http.com/)
- Testing: [Vitest](https://vitest.dev/) & [Vue Test Utils](https://test-utils.vuejs.org/)
- Build Tool: [Vite](https://vitejs.dev/)

## Project Structure

The project follows a standard, feature-oriented structure to ensure code is modular and easy to locate.

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable, presentational Vue components
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia state management stores
│   ├── style.css         # Global Styles
│   ├── types.ts          # Shared TypeScript interfaces
│   ├── server.ts         # MirageJS mock API server configuration
│   ├── main.ts           # Main application entry point
│   └── App.vue           # Root Vue component and layout shell
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md

```

## Getting Started

Follow these steps to get the project running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js (v18.x or later recommended)
- npm (or yarn/pnpm)

#### Installation & Setup

&nbsp; 1. Clone the repository:

```bash
  git clone https://github.com/your-username/transport-tracker.git
  cd transport-tracker
```

&nbsp; 2. Install dependencies:

```bash
  npm install
```

&nbsp; 3. Run the development server:

```bash
  npm run dev
```

The application will be available at http://localhost:5173. The MirageJS mock API server will start automatically, and you can see its logs in the browser console.

## Available Scripts

- `npm run dev`: Starts the development server with hot-module replacement.
- `npm run build`: Compiles and minifies the application for production.
- `npm run preview`: Serves the production build locally to preview it.
- `npm run test`: Runs the unit and component tests using Vitest.

## Running Tests

The project uses Vitest for both unit and component testing.

- **Unit Tests**: Located in src/stores/shipmentStore.spec.ts, these tests verify the business logic within the Pinia store in isolation.
- **Component Tests**: Located in src/components/ShipmentDetail.spec.ts, these tests mount a component and simulate user interaction to verify its behavior.

To run all tests, execute:

```bash
npm run test
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.## Architectural Decisions & Best Practices

- Centralized State Management: Pinia is used as the single source of truth for all shipment-related data. This simplifies state sharing between components and makes the application's data flow predictable.
- Mock API during Development: MirageJS intercepts all API calls, allowing for rapid frontend development and testing without depending on a live backend. It also powers the real-time update simulation.
- Type Safety: TypeScript is used throughout the project to ensure type safety, reduce runtime errors, and improve developer experience with autocompletion.
- Lifecycle Management: Vue's onMounted and onUnmounted hooks are used to responsibly manage side effects, such as starting and stopping the real-time polling to prevent memory leaks.
