# Media SDK — Using Components Skill

## Purpose

Use this skill when building UI with `@media-sdk/ui-react`.

The component library is headless.

Components provide behavior and accessibility contracts but do not provide application-specific visual styling.

The application owns:

* markup customization
* CSS
* colors
* spacing
* typography
* responsive layout
* visual design

---

## Architecture

The UI layer is independent from the SDK data layer.

```text
Application
 │
 ├── @media-sdk/react
 │       └── data
 │
 └── @media-sdk/ui-react
         └── presentation
```

`@media-sdk/ui-react` must not import:

```text
@media-sdk/core
@media-sdk/react
@media-sdk/native
```

Components receive data through props.

---

## Grid

Use `Grid` for collections of media items.

Typical usage:

```tsx
<Grid
  items={photos}
  getKey={(photo) => String(photo.id)}
  renderItem={(photo) => (
    <button type="button">
      <img
        src={photo.src.medium}
        alt={photo.alt || "Media"}
      />
    </button>
  )}
/>
```

### Grid responsibilities

The component should handle collection behavior such as:

* rendering items
* item keys
* load-more/infinite-scroll behavior when configured
* exposing the item rendering contract

The application controls the visual presentation.

---

## Grid Accessibility

Interactive media should use semantic controls.

Prefer:

```tsx
<button type="button">
  <img ... />
</button>
```

instead of:

```tsx
<div onClick={...}>
  <img ... />
</div>
```

Images must have meaningful `alt` text.

If an image is decorative, use an empty alt value:

```tsx
alt=""
```

---

## Lightbox

Use `Lightbox` for focused media viewing.

Example:

```tsx
<Lightbox
  open={selectedMedia !== null}
  onClose={() => setSelectedMedia(null)}
>
  {selectedMedia && (
    <img
      src={selectedMedia.src.large}
      alt={selectedMedia.alt || "Media"}
    />
  )}
</Lightbox>
```

The application owns the content rendered inside the lightbox.

The component owns lightbox behavior such as:

* open/close behavior
* focus management
* keyboard interaction
* escape handling
* accessible dialog behavior

Do not recreate those behaviors in the application unless extending the component contract.

---

## Lightbox Accessibility

A lightbox must remain keyboard accessible.

Expected behavior includes:

```text
Enter / Space → activate media
Escape → close lightbox
Tab → move through focusable controls
```

Do not remove focus behavior by adding inaccessible custom overlays.

---

## ReelSwiper

Use `ReelSwiper` for vertically-oriented media experiences.

Example:

```tsx
<ReelSwiper
  items={reelItems}
  onActiveChange={(index) => {
    console.log("Active item:", index);
  }}
/>
```

Each item can contain application-defined content.

For video:

```tsx
<video
  src={videoUrl}
  poster={posterUrl}
  controls
  playsInline
/>
```

The component should receive already-prepared media content.

It should not know how the video URL was obtained.

---

## Video Handling

The UI component must not search for videos.

Prepare the video data in the application:

```tsx
const reelItems = videos.map((video) => {
  const videoFile = video.video_files
    .filter(
      (file) =>
        file.file_type === "video/mp4"
    )
    .sort(
      (a, b) =>
        (b.width ?? 0) -
        (a.width ?? 0)
    )[0];

  if (!videoFile) {
    return null;
  }

  return (
    <video
      key={video.id}
      src={videoFile.link}
      poster={video.image}
      controls
      playsInline
    />
  );
});
```

The component library should treat these as generic React elements.

---

## Prop-Getters and Headless Behavior

When a component exposes a hook or prop-getter, use it instead of recreating component behavior.

For example:

```tsx
const {
  getContainerProps,
  getItemProps
} = useGrid(...);
```

Then:

```tsx
<div {...getContainerProps()}>
  <div {...getItemProps()}>
    ...
  </div>
</div>
```

Prop-getters should be merged with application props carefully.

Example:

```tsx
<div
  {...getItemProps()}
  className="my-custom-class"
/>
```

Do not overwrite required accessibility attributes returned by the prop-getter.

---

## Styling Contract

The UI library must remain headless.

Do not add:

```tsx
style={{
  background: "red",
  padding: "20px"
}}
```

inside reusable library components unless the style is required for functionality.

Application-specific styles belong in the consuming application.

The application can use:

```tsx
className="photo-card"
```

and define the appearance in CSS.

---

## Responsive Design

The application is responsible for responsive styling.

For example:

```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(
    4,
    minmax(0, 1fr)
  );
}

@media (max-width: 900px) {
  .photo-grid {
    grid-template-columns: repeat(
      2,
      minmax(0, 1fr)
    );
  }
}
```

Do not hard-code desktop-only dimensions into reusable UI components.

---

## Event Callbacks

Use component callbacks for UI behavior.

Example:

```tsx
<ReelSwiper
  items={items}
  onActiveChange={(index) => {
    setActiveIndex(index);
  }}
/>
```

The component should not know about analytics, Pexels, or the SDK.

If analytics are required, connect the callback in the application.

---

## Separation of Responsibilities

### Data layer

Responsible for:

```text
API
authentication
caching
pagination
events
media retrieval
```

### UI layer

Responsible for:

```text
rendering
interaction
keyboard behavior
focus behavior
prop-getters
component callbacks
```

### Application

Responsible for:

```text
connecting data to UI
business decisions
styling
analytics wiring
routing
application state
```

---

## What the AI Assistant Must Not Do

When using `@media-sdk/ui-react`, do not:

* Add Pexels API calls to components.
* Import `@media-sdk/core`.
* Import `@media-sdk/react`.
* Add API-key handling.
* Add Pexels-specific business logic.
* Add application-specific global CSS to the component package.
* Replace accessible buttons with clickable divs.
* Remove keyboard/focus behavior.
* Assume every media item is an image.
* Hard-code a particular application's visual theme into reusable components.

---

## Implementation Checklist

Before completing a UI integration:

* [ ] Components receive data through props.
* [ ] No Pexels/API logic exists in UI components.
* [ ] No SDK imports exist in `media-ui-react`.
* [ ] Grid supports the required collection behavior.
* [ ] Lightbox is keyboard accessible.
* [ ] Escape closes the lightbox.
* [ ] Interactive elements are keyboard accessible.
* [ ] Images have appropriate alt text.
* [ ] Videos use `controls` and `playsInline` when appropriate.
* [ ] Styling is owned by the consuming application.
* [ ] Responsive behavior is implemented by the application.
* [ ] Component callbacks are used instead of duplicated behavior.

## AI Behavior

When asked to build a new UI:

1. Inspect the available components and hooks first.
2. Prefer existing prop-getters and component APIs.
3. Keep media data preparation in the application/data layer.
4. Keep reusable UI components framework-appropriate and headless.
5. Never introduce Pexels-specific assumptions into the UI library.
6. Preserve accessibility behavior.
7. Put application-specific styling in the consuming app.
8. Do not create a second data-fetching layer inside the UI components.
