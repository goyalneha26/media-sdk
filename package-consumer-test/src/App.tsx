import { useState } from "react";
import {
MediaProvider,
useMediaSearch,
} from "@media-sdk/react";

import {
Grid,
Lightbox,
ReelSwiper,
} from "@media-sdk/ui-react";

import "./App.css";

function MediaTest() {
const [query, setQuery] = useState("nature");
const [selectedPhoto, setSelectedPhoto] =
useState<any>(null);

const {
photos,
loading,
error,
search,
} = useMediaSearch();

const handleSearch = async () => {
const value = query.trim();


if (!value) return;

await search(value);


};

const errorMessage =
error === null || error === undefined
? ""
: String(error);

return ( <div className="app">

```
  {/* NAVBAR */}
  <header className="navbar">
    <div className="brand">
      <div className="brand-icon">M</div>
      <div>
        <h2>MediaFlow</h2>
        <span>Media SDK Gallery</span>
      </div>
    </div>

    <div className="nav-badge">
      SDK Consumer Demo
    </div>
  </header>

  {/* HERO */}
  <section className="hero">

    <div className="hero-content">
      <span className="eyebrow">
        POWERED BY MEDIA SDK
      </span>

      <h1>
        Discover beautiful
        <span> photography.</span>
      </h1>

      <p>
        Search thousands of high-quality images
        and explore them through a fast,
        responsive media experience.
      </p>

      {/* SEARCH */}
      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search nature, travel, technology..."
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Search"}
        </button>

      </div>

      <div className="suggestions">
        <span>Try:</span>

        {[
          "Nature",
          "Technology",
          "Travel",
          "Architecture",
          "Animals",
        ].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setQuery(item);
              search(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>

    </div>

  </section>

  {/* MAIN */}
  <main className="content">

    {/* ERROR */}
    {errorMessage !== "" && (
      <div className="error-box">
        <span>⚠️</span>
        <div>
          <strong>
            Something went wrong
          </strong>
          <p>{errorMessage}</p>
        </div>
      </div>
    )}

    {/* RESULTS HEADER */}
    {photos.length > 0 && (
      <div className="results-header">

        <div>
          <span className="section-label">
            SEARCH RESULTS
          </span>

          <h2>
            Explore {query}
          </h2>

          <p>
            {photos.length} beautiful photos
            found
          </p>
        </div>

        <div className="result-count">
          {photos.length}
          <span>Photos</span>
        </div>

      </div>
    )}

    {/* GRID */}
    {photos.length > 0 ? (
      <section className="gallery">

        <Grid
          items={photos}
          getKey={(photo) =>
            String(photo.id)
          }
          renderItem={(photo) => (
            <article className="photo-card">

              <div className="image-wrapper">

                <img
                  src={photo.src.large}
                  alt={
                    photo.alt ||
                    "Pexels photo"
                  }
                />

                <div className="image-overlay">

                  <button
                    type="button"
                    onClick={() => {
                      console.log(
                        "PHOTO CLICKED:",
                        photo.id
                      );

                      setSelectedPhoto(
                        photo
                      );
                    }}
                  >
                    View Image
                  </button>

                </div>

              </div>

              <div className="photo-info">

                <div>
                  <span>
                    PHOTOGRAPHER
                  </span>

                  <strong>
                    {photo.photographer}
                  </strong>
                </div>

                <button
                  type="button"
                  className="heart"
                  onClick={() =>
                    setSelectedPhoto(
                      photo
                    )
                  }
                >
                  ♡
                </button>

              </div>

            </article>
          )}
        />

      </section>
    ) : (
      <section className="empty-state">

        <div className="empty-icon">
          🖼️
        </div>

        <h2>
          Start exploring
        </h2>

        <p>
          Search for something beautiful
          and your images will appear here.
        </p>

        <button
          type="button"
          onClick={handleSearch}
        >
          Explore Nature
        </button>

      </section>
    )}

    {/* REEL SECTION */}
    {photos.length >= 5 && (
      <section className="reel-section">

        <div className="section-heading">
          <div>
            <span className="section-label">
              FEATURED
            </span>

            <h2>
              Explore in Motion
            </h2>

            <p>
              Swipe through featured
              photography.
            </p>
          </div>
        </div>

        <div className="reel-container">

          <ReelSwiper
            items={photos
              .slice(0, 5)
              .map((photo) => (
                <div
                  key={photo.id}
                  className="reel-card"
                >
                  <img
                    src={
                      photo.src.large2x
                    }
                    alt={
                      photo.alt ||
                      "Featured photo"
                    }
                  />

                  <div className="reel-caption">
                    <span>
                      PHOTO
                    </span>

                    <strong>
                      {photo.photographer}
                    </strong>
                  </div>

                </div>
              ))}

            onActiveChange={(index) => {
              console.log(
                "REEL ACTIVE:",
                index
              );
            }}
          />

        </div>

      </section>
    )}

  </main>

  {/* LIGHTBOX */}
  <Lightbox
    open={selectedPhoto !== null}
    onClose={() => {
      console.log(
        "LIGHTBOX CLOSED"
      );

      setSelectedPhoto(null);
    }}
  >

    {selectedPhoto && (
      <div className="lightbox-content">

        <img
          src={
            selectedPhoto.src.original
          }
          alt={
            selectedPhoto.alt ||
            "Selected photo"
          }
        />

        <div className="lightbox-details">
          <span>
            PHOTOGRAPHER
          </span>

          <strong>
            {selectedPhoto.photographer}
          </strong>
        </div>

      </div>
    )}

  </Lightbox>

  {/* FOOTER */}
  <footer className="footer">

    <div className="brand footer-brand">
      <div className="brand-icon">
        M
      </div>

      <div>
        <strong>
          MediaFlow
        </strong>

        <span>
          Built with Media SDK
        </span>
      </div>
    </div>

    <span>
      Media SDK Consumer Test
    </span>

  </footer>

</div>


);
}

function App() {
return ( <MediaProvider
   apiKey="rN4vTYaiFfybQl9WW87aOXBOTkfeefHeFmnIXJJWzs1EQ4meQIgmjlJW"
 > <MediaTest /> </MediaProvider>
);
}

export default App;
