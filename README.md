# Media SDK

A modular, TypeScript-based Media SDK for building modern media applications with reusable core services, Pexels-powered media search, React bindings, React UI components, and React Native support.

## ✨ Features

* 🔎 Media search using the Pexels API
* 🎬 Media player and playback management
* 📊 Analytics and media events
* ⚡ Adaptive Bitrate (ABR) and quality management
* 💾 Media caching and buffering
* 🌐 Network monitoring
* 🔐 Authentication management
* 🛡️ Error handling and recovery
* ⚛️ React hooks and `MediaProvider`
* 🎨 Reusable React UI components
* 📱 React Native support
* 📦 Modular workspace-based package architecture
* 🔷 TypeScript-first API with generated type definitions

---

## 📦 Packages

The SDK is organized into independent packages.

### `@media-sdk/core`

The main SDK engine containing the core media functionality.

Includes:

* Media player
* Playlist management
* Media sources
* Buffer management
* Cache management
* Network monitoring
* Analytics
* Authentication
* Error handling
* Recovery management
* Quality management
* Adaptive bitrate control
* Pexels API client
* Event emitter
* Type definitions

### `@media-sdk/react`

React bindings for the Media SDK.

Provides:

* `MediaProvider`
* `useMediaSearch`
* `useMediaEvents`

### `@media-sdk/ui-react`

Reusable React UI components.

Provides:

* `Grid`
* `Lightbox`
* `ReelSwiper`

### `@media-sdk/native`

React Native bindings for mobile applications.

Provides:

* `MediaProvider`
* `useMediaSearch`
* `useMediaEvents`

---

## 🏗️ Architecture

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
│   ├── media-ui-react/
│   │   └── components/
│   │       ├── Grid/
│   │       ├── Lightbox/
│   │       └── ReelSwiper/
│   │
│   ├── media-native/
│   │   ├── MediaProvider
│   │   └── hooks/
│   │
│   └── media-app/
│       └── Demo application
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

* TypeScript
* React
* React Native
* Vite
* Pexels API
* npm Workspaces
* Node.js

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* TypeScript

installed on your system.

### Clone the repository

```bash
git clone <your-repository-url>
cd media-sdk
```

### Install dependencies

```bash
npm install
```

---

## 🔑 Pexels API

The Media SDK uses the Pexels API for media search.

Create a Pexels API key and configure it in the application.

Example:

```tsx
<MediaProvider apiKey="YOUR_PEXELS_API_KEY">
  <App />
</MediaProvider>
```

> Do not commit real API keys to GitHub.

---

# ⚛️ React Usage

Install the React package:

```bash
npm install @media-sdk/react
```

Then wrap your application with `MediaProvider`.

```tsx
import { MediaProvider } from "@media-sdk/react";

function App() {
  return (
    <MediaProvider apiKey="YOUR_PEXELS_API_KEY">
      {/* Your application */}
    </MediaProvider>
  );
}

export default App;
```

---

## 🔎 Media Search

Use `useMediaSearch` to search for photos.

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
        <p>
          {String(error)}
        </p>
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

# 🎨 React UI Components

Install the UI package:

```bash
npm install @media-sdk/ui-react
```

## Grid

The `Grid` component renders a reusable media grid.

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

---

## Lightbox

The `Lightbox` component provides a reusable media overlay.

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

---

## ReelSwiper

The `ReelSwiper` component provides horizontally scrollable media content.

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

# 🧪 Consumer Testing

The SDK includes a consumer application used to validate the actual packaged SDK.

The packages can be packed locally:

```bash
npm pack --workspace @media-sdk/core
npm pack --workspace @media-sdk/react
npm pack --workspace @media-sdk/ui-react
npm pack --workspace @media-sdk/native
```

This generates:

```text
media-sdk-core-1.0.0.tgz
media-sdk-react-1.0.0.tgz
media-sdk-ui-react-1.0.0.tgz
media-sdk-native-1.0.0.tgz
```

These packages can then be installed into the consumer application:

```bash
npm install ../media-sdk-core-1.0.0.tgz
npm install ../media-sdk-react-1.0.0.tgz
npm install ../media-sdk-ui-react-1.0.0.tgz
npm install ../media-sdk-native-1.0.0.tgz
```

The consumer application has been validated with:

* Package installation
* TypeScript compilation
* Vite production build
* Pexels API search
* Photo rendering
* Grid interaction
* Lightbox interaction
* ReelSwiper interaction

---

# 🔨 Development

Install dependencies from the repository root:

```bash
npm install
```

Build all packages:

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

## AI-Assisted Development

AI coding tools were used during development for:

- scaffolding package structures
- TypeScript debugging
- test generation
- documentation drafting
- refactoring suggestions

Architecture decisions, dependency boundaries, SDK contracts,
and final implementation were reviewed and validated manually.

### AI Skills

Two SKILL.md files were created:

- `skills/media-data-wiring/SKILL.md`
- `skills/media-components/SKILL.md`

These were used to guide an AI coding assistant while implementing
the application layer.

---

# 📄 License

MIT License.

---

# 👩‍💻 Author

**Neha Goyal**

Built as a modular TypeScript media SDK demonstrating package architecture, API integration, React bindings, reusable UI components, and cross-platform support.
