import { useState } from "react";
import {
  Grid,
  Lightbox,
  ReelSwiper,
} from "@media-sdk/ui-react";

type DemoItem = {
  id: number;
  title: string;
  image: string;
};

const demoItems: DemoItem[] = [
  {
    id: 1,
    title: "Mountain",
    image:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Forest",
    image:
      "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Ocean",
    image:
      "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Lake",
    image:
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Landscape",
    image:
      "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Nature",
    image:
      "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function App() {
  const [selected, setSelected] = useState<DemoItem | null>(null);

  return (
    <div className="docs">
      <header className="hero">
        <div className="container">
          <p className="eyebrow">@media-sdk/ui-react</p>

          <h1>Media SDK Components</h1>

          <p className="hero-description">
            Headless React components for building modern media experiences.
            Components provide behavior and accessibility while consumers
            control markup, styling, and presentation.
          </p>

          <div className="badges">
            <span>React</span>
            <span>TypeScript</span>
            <span>Headless UI</span>
            <span>Accessible</span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section">
          <h2>Overview</h2>

          <p>
            The Media SDK UI package is intentionally independent from the
            Media SDK core and platform wrappers. Components receive data and
            callbacks through props and do not know about Pexels or the SDK
            data layer.
          </p>

          <div className="architecture">
            <div>
              <strong>Application</strong>
              <span>Wires data and UI</span>
            </div>

            <div className="arrow">→</div>

            <div>
              <strong>media-react</strong>
              <span>Data and events</span>
            </div>

            <div className="arrow">+</div>

            <div>
              <strong>media-ui-react</strong>
              <span>Pure UI behavior</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Components</h2>

          <div className="component-list">
            <a href="#grid">Grid</a>
            <a href="#lightbox">Lightbox</a>
            <a href="#reels">Reel Swiper</a>
          </div>
        </section>

        <section id="grid" className="section">
          <div className="section-heading">
            <div>
              <p className="component-label">Component 01</p>
              <h2>Grid</h2>
            </div>

            <code>Grid&lt;T&gt;</code>
          </div>

          <p>
            A reusable media grid that accepts arbitrary data and rendering
            logic. The component does not make API calls or depend on the
            Media SDK.
          </p>

          <h3>Example</h3>

          <pre>
{`<Grid
  items={photos}
  getKey={(photo) => String(photo.id)}
  renderItem={(photo) => (
    <img
      src={photo.src.medium}
      alt={photo.alt}
    />
  )}
  onItemClick={(photo) => {
    setSelected(photo);
  }}
/>`}
          </pre>

          <h3>Live example</h3>

          <Grid
            items={demoItems}
            getKey={(item) => String(item.id)}
            renderItem={(item) => (
              <div className="demo-card">
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </div>
            )}
            onItemClick={(item) => setSelected(item)}
          />

          <div className="api-table">
            <div>
              <strong>items</strong>
              <span>Data collection rendered by the grid.</span>
            </div>

            <div>
              <strong>getKey</strong>
              <span>Returns a stable key for each item.</span>
            </div>

            <div>
              <strong>renderItem</strong>
              <span>Consumer-controlled item rendering.</span>
            </div>

            <div>
              <strong>onItemClick</strong>
              <span>Called when an item is selected.</span>
            </div>
          </div>
        </section>

        <section id="lightbox" className="section">
          <div className="section-heading">
            <div>
              <p className="component-label">Component 02</p>
              <h2>Lightbox</h2>
            </div>

            <code>Lightbox</code>
          </div>

          <p>
            A modal media presentation component. The consumer owns the
            content rendered inside the lightbox.
          </p>

          <h3>Example</h3>

          <pre>
{`<Lightbox
  open={selected !== null}
  onClose={() => setSelected(null)}
>
  {selected && (
    <img
      src={selected.src.large}
      alt={selected.alt}
    />
  )}
</Lightbox>`}
          </pre>

          <button
            className="primary-button"
            onClick={() => setSelected(demoItems[0])}
          >
            Open Lightbox
          </button>

          <div className="api-table">
            <div>
              <strong>open</strong>
              <span>Controls whether the lightbox is visible.</span>
            </div>

            <div>
              <strong>onClose</strong>
              <span>Called when the lightbox should close.</span>
            </div>

            <div>
              <strong>children</strong>
              <span>Consumer-provided media content.</span>
            </div>
          </div>
        </section>

        <section id="reels" className="section">
          <div className="section-heading">
            <div>
              <p className="component-label">Component 03</p>
              <h2>Reel Swiper</h2>
            </div>

            <code>ReelSwiper</code>
          </div>

          <p>
            A vertical media browsing component designed for reel-style
            experiences with active-item detection.
          </p>

          <h3>Example</h3>

          <pre>
{`<ReelSwiper
  items={items}
  onActiveChange={(index) => {
    console.log(index);
  }}
/>`}
          </pre>

          <div className="reel-demo">
            <ReelSwiper
              items={demoItems.map((item) => (
                <div className="reel-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>{item.title}</div>
                </div>
              ))}
              onActiveChange={(index) => {
                console.log("Active reel:", index);
              }}
            />
          </div>
        </section>

        <section className="section">
          <h2>Headless Design</h2>

          <div className="principles">
            <article>
              <h3>No shipped styles</h3>
              <p>
                Consumers control the visual design and layout of their
                applications.
              </p>
            </article>

            <article>
              <h3>Data agnostic</h3>
              <p>
                Components accept generic data and callbacks instead of
                depending on Pexels or the SDK.
              </p>
            </article>

            <article>
              <h3>Composable</h3>
              <p>
                Components can be combined with application-specific data
                fetching and state management.
              </p>
            </article>

            <article>
              <h3>Accessible</h3>
              <p>
                Interaction behavior is implemented by the component while
                consumers provide appropriate content and styling.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <h2>Styling Contract</h2>

          <p>
            The UI package intentionally avoids prescribing application
            styles. Consumers can use CSS, CSS modules, Tailwind, design
            systems, or any other styling approach.
          </p>

          <pre>
{`/* Consumer-owned styling */

.media-card {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.media-grid {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 16px;
}`}
          </pre>
        </section>

        <section className="section">
          <h2>Architecture Rules</h2>

          <div className="rules">
            <div>✓ UI components never import media-core</div>
            <div>✓ UI components never import media-react</div>
            <div>✓ Components receive data through props</div>
            <div>✓ Application wires data and presentation</div>
            <div>✓ Core remains framework agnostic</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <strong>Media SDK</strong>
          <span>Headless Media Components</span>
        </div>
      </footer>

      <Lightbox
        open={selected !== null}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="lightbox-content">
            <img src={selected.image} alt={selected.title} />
            <h3>{selected.title}</h3>
          </div>
        )}
      </Lightbox>
    </div>
  );
}

export default App;