# Media SDK

A modular, TypeScript-first Media SDK ecosystem for building modern media applications with reusable core services, platform wrappers, headless UI components, and a React demo application powered by the Pexels API.

## 🔗 Project Links

* **GitHub:** https://github.com/goyalneha26/media-sdk
* **Live Demo:** https://media-sdk-media-app.vercel.app
* **Vercel Project:** https://vercel.com/me-699c/media-sdk-media-app

---

## ✨ Features

* 🔎 Pexels-powered photo and video search
* 📄 Pagination and load-more support
* 🎬 Media player and playback management
* 📊 Analytics and media activity events
* ⚡ Adaptive bitrate and quality management
* 💾 In-memory caching and buffering
* 🌐 Network monitoring
* 🔐 API key authentication/configuration
* 🛡️ Error handling and recovery
* ⚛️ React provider and hooks
* 🎨 Headless React UI components
* 📱 React Native bindings
* 📦 npm workspace-based monorepo architecture
* 🔷 TypeScript-first APIs with generated declaration files

---

# 🏗️ Architecture

The project is intentionally separated into four layers:

```text
                         ┌─────────────────────┐
                         │     media-app       │
                         │    React Demo       │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
          ┌─────────────────┐              ┌──────────────────┐
          │   media-react   │              │  media-ui-react  │
          │ Platform Wrapper│              │   Pure UI Layer  │
          └────────┬────────┘              └──────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   media-core    │
          │ Framework-free  │
          │ TypeScript SDK  │
          └─────────────────┘
```

The dependency direction is:

```text
app → media-react → media-core
app → media-ui-react
```

The following boundaries are intentionally enforced:

* `media-core` does not import React, React Native, or UI components.
* `media-react` only adapts `media-core` to React.
* `media-native` only adapts `media-core` to React Native.
* `media-ui-react` does not import `media-core` or any platform wrapper.
* `media-ui-native` does not import `media-core` or any platform wrapper.
* UI components receive data and callbacks through props.
* The application is responsible for connecting SDK data to UI components.

This allows the core SDK to theoretically be consumed by a CLI, another framework, or another application without changing the core implementation.

---

# 📦 Packages

## `@media-sdk/core`

Framework-agnostic TypeScript SDK containing the core media functionality.

### Includes

* Pexels API client
* Search
* Curated media retrieval
* Pagination
* Single-item retrieval
* Authentication/configuration
* Media player
* Playlist management
* Media sources
* Buffer management
* Cache management
* Network monitoring
* Analytics
* Event emitter
* Error handling
* Recovery management
* Quality management
* Adaptive bitrate control
* Typed media contracts

The core package contains **no React, DOM, or React Native dependencies**.

---

## `@media-sdk/react`

React bindings around `@media-sdk/core`.

Provides:

* `MediaProvider`
* `useMediaSearch`
* `useMediaEvents`

The React package contains adapter logic only and does not implement independent media business logic.

---

## `@media-sdk/native`

React Native bindings around `@media-sdk/core`.

Provides:

* `MediaProvider`
* `useMediaSearch`
* `useMediaEvents`

The native wrapper follows the same SDK contract while adapting it to React Native.

---

## `@media-sdk/ui-react`

Headless React UI component library.

Provides:

* `Grid`
* `Lightbox`
* `ReelSwiper`

The components are independent of the SDK and receive data through props.

They do not know about:

* Pexels
* `media-core`
* `media-react`
* API authentication
* SDK caching

No application-specific styles are shipped by the component library. Consumers control markup, styling, and presentation.

---

## `@media-sdk/ui-native`

React Native headless UI component library.

Provides platform-specific implementations of:

* Grid
* Lightbox
* Reel Swiper

Like the React UI package, it remains independent from the SDK core and platform wrappers.

---

# 🛠️ Tech Stack

* TypeScript
* React
* React Native
* Vite
* Pexels API
* npm Workspaces
* Node.js

---

# 📁 Project Structure

```text
media-sdk/
│
├── packages/
│   │
│   ├── media-core/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── buffer/
│   │   ├── cache/
│   │   ├── client/
│   │   ├── config/
│   │   ├── emitter/
│   │   ├── error/
│   │   ├── network/
│   │   ├── player/
│   │   ├── quality/
│   │   ├── recovery/
│   │   └── types/
│   │
│   ├── media-react/
│   │   ├── MediaProvider
│   │   ├── hooks/
│   │   └── context
│   │
│   ├── media-native/
│   │   ├── MediaProvider
│   │   └── hooks/
│   │
│   ├── media-ui-react/
│   │   └── components/
│   │       ├── Grid/
│   │       ├── Lightbox/
│   │       └── ReelSwiper/
│   │
│   ├── media-ui-native/
│   │   └── components/
│   │       ├── Grid/
│   │       ├── Lightbox/
│   │       └── ReelSwiper/
│   │
│   └── media-app/
│       └── Demo application
│
├── skills/
│   ├── wiring-data/
│   │   └── SKILL.md
│   └── using-components/
│       └── SKILL.md
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install:

* Node.js
* npm
* TypeScript

## Clone

```bash
git clone https://github.com/goyalneha26/media-sdk.git
cd media-sdk
```

## Install dependencies

```bash
npm install
```

---

# 🔑 Pexels API Configuration

The application uses the Pexels API as its media data source.

Create a Pexels API key and configure it through the application environment/configuration.

Example:

```tsx
<MediaProvider apiKey="YOUR_PEXELS_API_KEY">
  <App />
</MediaProvider>
```

**Never commit a real API key to GitHub.**

For local development, use the project's environment configuration where applicable.

---

# ⚛️ React Usage

Install the React package:

```bash
npm install @media-sdk/react
```

Configure the provider:

```tsx
import { MediaProvider } from "@media-sdk/react";

function App() {
  return (
    <MediaProvider apiKey="YOUR_PEXELS_API_KEY">
      <Application />
    </MediaProvider>
  );
}
```

---

# 🔎 Media Search

The `useMediaSearch` hook exposes media search state and operations.

```tsx
import { useMediaSearch } from "@media-sdk/react";

function SearchComponent() {
  const {
    photos,
    loading,
    error,
    search
  } = useMediaSearch();

  const handleSearch = async () => {
    await search("nature");
  };

  return (
    <div>
      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Searching...</p>}

      {error && (
        <p>{String(error)}</p>
      )}

      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src.medium}
          alt={photo.alt}
        />
      ))}
    </div>
  );
}
```

---

# 📊 Media Events

The SDK exposes media activity events through an event emitter.

At minimum, the SDK supports:

* `view`
* `download`

Applications can subscribe independently to track activity.

Example:

```tsx
import { useMediaEvents } from "@media-sdk/react";

function Analytics() {
  useMediaEvents((event) => {
    console.log("Media event:", event);
  });

  return null;
}
```

The SDK also provides a default event listener for activity logging.

---

# 🎨 Headless React Components

Install:

```bash
npm install @media-sdk/ui-react
```

The UI package is intentionally headless.

The consumer controls:

* HTML structure
* CSS
* layout
* colors
* typography
* spacing
* media presentation
* interaction styling

---

## Grid

The `Grid` component renders media collections and supports load-more/infinite-scroll behavior.

```tsx
import { Grid } from "@media-sdk/ui-react";

<Grid
  items={photos}
  getKey={(photo) => String(photo.id)}
  renderItem={(photo) => (
    <img
      src={photo.src.medium}
      alt={photo.alt}
      style={{
        width: "100%"
      }}
    />
  )}
  onItemClick={(photo) => {
    console.log("Selected:", photo);
  }}
/>
```

The Grid does not fetch Pexels data itself. Data and callbacks are supplied by the consumer.

---

# 🖼️ Lightbox

The Lightbox provides a reusable media overlay.

```tsx
import { Lightbox } from "@media-sdk/ui-react";

<Lightbox
  open={selectedPhoto !== null}
  onClose={() => setSelectedPhoto(null)}
>
  {selectedPhoto && (
    <img
      src={selectedPhoto.src.large}
      alt={selectedPhoto.alt}
      style={{
        maxWidth: "90vw",
        maxHeight: "80vh"
      }}
    />
  )}
</Lightbox>
```

The web implementation supports keyboard/focus interaction appropriate for an overlay component.

---

# 🎬 ReelSwiper

The Reel Swiper provides vertical snap-based media paging with active-item detection.

```tsx
import { ReelSwiper } from "@media-sdk/ui-react";

<ReelSwiper
  items={photos.map((photo) => (
    <img
      key={photo.id}
      src={photo.src.medium}
      alt={photo.alt}
    />
  ))}
  onActiveChange={(index) => {
    console.log("Active item:", index);
  }}
/>
```

The component does not know where the media originated. The consumer supplies the media items.

---

# 📱 React Native

The SDK also provides React Native bindings.

```bash
npm install @media-sdk/native
```

Example:

```tsx
import {
  MediaProvider,
  useMediaSearch
} from "@media-sdk/native";

function SearchScreen() {
  const {
    photos,
    loading,
    error,
    search
  } = useMediaSearch();

  return null;
}
```

---

# 🧪 Consumer Validation

The SDK includes consumer-oriented validation to ensure that the packages can be consumed outside their source workspace implementation.

Packages can be packed locally:

```bash
npm pack --workspace @media-sdk/core
npm pack --workspace @media-sdk/react
npm pack --workspace @media-sdk/ui-react
npm pack --workspace @media-sdk/native
```

The resulting packages can be installed into a separate consumer application.

Validation includes:

* Package installation
* TypeScript compilation
* Production builds
* Pexels API integration
* Media rendering
* Grid interaction
* Lightbox interaction
* ReelSwiper interaction

---

# 🔨 Development

Install dependencies:

```bash
npm install
```

Build the complete workspace:

```bash
npm run build
```

Build individual packages:

```bash
npm run build:core
npm run build:react
npm run build:ui
npm run build:native
npm run build:app
```

Run the demo application:

```bash
npm run dev
```

---

# 📋 Package Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run build`        | Build all SDK packages     |
| `npm run build:core`   | Build Core package         |
| `npm run build:react`  | Build React bindings       |
| `npm run build:ui`     | Build React UI package     |
| `npm run build:native` | Build React Native package |
| `npm run build:app`    | Build demo application     |
| `npm run dev`          | Start demo application     |

---

# 🤖 AI-Assisted Development

AI coding tools were explicitly used during development.

AI assistance included:

* Package scaffolding
* TypeScript debugging
* Build and dependency troubleshooting
* Refactoring suggestions
* Test/validation suggestions
* Documentation drafting
* Architecture review
* Development workflow assistance

Final architecture, package boundaries, API contracts, dependency direction, and implementation were reviewed and validated manually.

---

# 🧠 AI Skills

Two practical skill documents were created for AI coding assistants:

### `skills/wiring-data/SKILL.md`

Guides an AI assistant on:

* `MediaProvider` setup
* API configuration
* Search hooks
* Loading/error states
* Pagination
* Media events
* Connecting SDK data to application state

### `skills/using-components/SKILL.md`

Guides an AI assistant on:

* Grid usage
* Lightbox usage
* Reel Swiper usage
* Headless component patterns
* Prop-driven data
* Consumer-owned styling
* Accessibility expectations
* Keeping UI components independent from the SDK

These skills were used to guide implementation of the application layer and enforce the intended separation between data wiring and UI composition.

---

# 🎯 Take-Home Design Decisions

The implementation prioritizes clear dependency boundaries and a practical scope.

### Core SDK

The core was kept framework-agnostic so it can theoretically be reused by different clients without React or React Native dependencies.

### Platform wrappers

React and React Native wrappers adapt the same core SDK rather than duplicating business logic.

### UI components

The UI libraries remain independent from the SDK. This allows the components to be used with any compatible media data source, not only Pexels.

### Application

The demo application is responsible for connecting the data layer and presentation layer.

This keeps the application composition layer separate from reusable SDK functionality.

---

# 📌 Scope and Limitations

The project focuses on the architecture and functionality requested by the take-home task.

Where functionality was intentionally scoped, the priority was:

1. Correct package boundaries
2. Typed SDK contracts
3. Working Pexels integration
4. Functional React bindings
5. Genuine headless UI components
6. Consumer validation
7. Practical AI-assisted development workflow

---

# 📄 License

MIT License.

---

# 👩‍💻 Author

**Neha Goyal**

Built as a modular TypeScript Media SDK demonstrating:

* Framework-agnostic SDK architecture
* Pexels API integration
* React and React Native bindings
* Headless UI components
* TypeScript package design
* npm workspace architecture
* AI-assisted development
* Reusable media application patterns
