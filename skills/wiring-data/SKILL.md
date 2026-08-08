# Media SDK — Wiring Data Skill

## Purpose

Use this skill when building a React application that needs to consume the Media SDK data layer.

The application should use `@media-sdk/react` for authentication, media retrieval, pagination, and SDK events.

The application must not access Pexels directly.

---

## Architecture

Follow this dependency direction:

```text
App
 │
 ├── @media-sdk/react
 │       │
 │       └── @media-sdk/core
 │
 └── @media-sdk/ui-react
```

The application is responsible for connecting the data layer to the UI layer.

### Rules

* `media-core` contains framework-independent SDK logic.
* `media-react` provides React hooks and provider functionality.
* The application uses `media-react` for data.
* The application uses `media-ui-react` for presentation.
* `media-ui-react` must not be used to fetch Pexels data.
* Never call the Pexels API directly from application components.
* Never put the Pexels API key in a component.
* Never import React-specific code into `media-core`.

---

## Provider Setup

Wrap the application with `MediaProvider`.

Example:

```tsx
import { MediaProvider } from "@media-sdk/react";

<MediaProvider apiKey={PEXELS_API_KEY}>
  <App />
</MediaProvider>
```

The provider creates and exposes the SDK client and event emitter.

All media hooks must be used below `MediaProvider`.

---

## Searching Photos

Use `useMediaSearch()` for photo searches.

```tsx
import { useMediaSearch } from "@media-sdk/react";

const {
  photos,
  loading,
  error,
  search
} = useMediaSearch();
```

Trigger a search:

```tsx
await search("nature");
```

Handle the three states:

```text
loading
success
error
```

Do not assume that the response always contains results.

Always safely handle:

```tsx
photos ?? []
```

---

## Searching Videos

Use `useMediaVideos()` for video searches.

```tsx
import { useMediaVideos } from "@media-sdk/react";

const {
  videos,
  loading,
  error,
  searchVideos
} = useMediaVideos();
```

Example:

```tsx
await searchVideos("travel");
```

Video results should remain separate from photo results.

Do not cast a video object to `PexelsPhoto`.

---

## Events

Use `useMediaEvents()` when the application needs SDK activity events.

Example:

```tsx
import { useMediaEvents } from "@media-sdk/react";

useMediaEvents("view", (event) => {
  console.log("Media viewed", event);
});
```

For downloads:

```tsx
useMediaEvents("download", (event) => {
  console.log("Media downloaded", event);
});
```

Event subscriptions must be cleaned up automatically by the hook.

Do not manually access the internal emitter from application components unless there is a specific SDK-level requirement.

---

## Error Handling

Never silently ignore SDK errors.

Use:

```tsx
if (error) {
  // display an appropriate UI state
}
```

For an `unknown` error:

```tsx
const message =
  error instanceof Error
    ? error.message
    : String(error);
```

Do not expose API keys or sensitive configuration in error messages.

---

## Loading States

Every asynchronous media operation should provide user feedback.

For example:

```tsx
<button disabled={loading}>
  {loading ? "Searching..." : "Search"}
</button>
```

Avoid triggering duplicate requests while an operation is already loading unless pagination explicitly requires concurrent requests.

---

## Pagination

When implementing pagination or infinite scrolling:

1. Track the current page.
2. Request the next page from the SDK.
3. Append new results rather than replacing existing results.
4. Prevent duplicate page requests.
5. Stop requesting when the API indicates there is no next page.

Conceptually:

```text
page 1 → results
          ↓
page 2 → append
          ↓
page 3 → append
          ↓
no next page → stop
```

Do not implement pagination by directly constructing Pexels URLs in the application.

---

## Search UI

A search component should:

1. Store the input value locally.
2. Validate empty input.
3. Call the appropriate SDK hook.
4. Display loading state.
5. Display errors.
6. Pass returned media to UI components.

Example:

```tsx
const handleSearch = async () => {
  const value = query.trim();

  if (!value) return;

  await search(value);
};
```

---

## What the AI Assistant Must Not Do

When modifying an application using this SDK, do not:

* Create direct `fetch()` calls to Pexels.
* Add Pexels API logic to React components.
* Import `PexelsClient` directly into normal UI components.
* Duplicate authentication logic.
* Store the API key inside component state.
* Implement caching inside the application when SDK caching already exists.
* Add business logic to `media-ui-react`.
* Modify `media-core` just to solve a presentation problem.

---

## Implementation Checklist

Before completing a data integration task, verify:

* [ ] `MediaProvider` wraps the application.
* [ ] `useMediaSearch()` is used for photo data.
* [ ] `useMediaVideos()` is used for video data.
* [ ] Loading states are handled.
* [ ] Error states are handled.
* [ ] Empty results are handled.
* [ ] Events are subscribed through `useMediaEvents()`.
* [ ] Pagination does not duplicate results.
* [ ] No direct Pexels API calls exist in the application.
* [ ] API keys are not hard-coded into components.

## AI Behavior

When asked to add a new data-driven feature:

1. Inspect the existing `media-react` hooks first.
2. Reuse an existing hook if possible.
3. Only add a new hook when the SDK contract genuinely requires it.
4. Keep data retrieval separate from presentation.
5. Pass plain media data and callbacks into UI components.
6. Preserve the dependency direction of the Media SDK architecture.
