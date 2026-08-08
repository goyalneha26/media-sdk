
import React, { useState } from "react";

import {
  useMediaSearch,
  useMediaVideos
} from "@media-sdk/react";

import {
  Grid,
  Lightbox,
  ReelSwiper
} from "@media-sdk/ui-react";

import type {
  PexelsPhoto
} from "@media-sdk/core";

import "./index.css";

function App() {
  const {
    photos,
    loading,
    error,
    search
  } = useMediaSearch();

  const {
    videos,
    loading: videosLoading,
    error: videosError,
    searchVideos
  } = useMediaVideos();

  const [selectedPhoto, setSelectedPhoto] =
    useState<PexelsPhoto | null>(null);

  const [query, setQuery] =
    useState("nature");

  const handleSearch = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      return;
    }

    search(value);
    searchVideos(value);
  };

  const handleQuickSearch = (
    value: string
  ) => {
    setQuery(value);

    search(value);
    searchVideos(value);
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? String(error)
        : videosError instanceof Error
          ? videosError.message
          : videosError
            ? String(videosError)
            : "";

  /*
   * Convert Pexels videos into ReelSwiper items.
   *
   * Every video gets the same visual container height.
   * objectFit: cover keeps different video aspect ratios
   * from making the ReelSwiper items different sizes.
   */
  const reelItems = videos
    .map((video) => {
      const videoFile =
        video.video_files
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
        <div
          key={video.id}
          className="reel-video-card"
        >
          <video
            src={videoFile.link}
            poster={video.image}
            controls
            playsInline
            preload="metadata"
            className="reel-video"
          />

          <div className="reel-video-overlay">
            <span>
              Pexels Video
            </span>

            <strong>
              #{video.id}
            </strong>
          </div>
        </div>
      );
    })
    .filter(
  (item): item is React.ReactElement =>
    item !== null
);

  const isSearching =
    loading || videosLoading;

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            M
          </div>

          <div>
            <h1>
              Media<span>SDK</span>
            </h1>

            <p>
              Headless Media Platform
            </p>
          </div>

        </div>

        <div className="status">

          <span className="status-dot" />

          SDK Connected

        </div>

      </header>


      {/* =========================
          HERO
      ========================== */}

      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            ✦ PEXELS MEDIA EXPLORER
          </div>

          <h2>
            Discover beautiful
            <span> media.</span>
          </h2>

          <p>
            Search, explore and interact
            with photos and videos using
            the Media SDK.
          </p>


          {/* =========================
              SEARCH
          ========================== */}

          <form
            className="search-box"
            onSubmit={handleSearch}
          >

            <span className="search-icon">
              🔍
            </span>

            <input
              value={query}

              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }

              placeholder="Search photos and videos..."
            />

            <button
              type="submit"
              disabled={isSearching}
            >
              {isSearching
                ? "Searching..."
                : "Search"}
            </button>

          </form>


          {/* =========================
              QUICK SEARCH
          ========================== */}

          <div className="quick-search">

            <span>
              Popular:
            </span>

            {[
              "Nature",
              "Technology",
              "Travel",
              "Ocean",
              "Architecture"
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() =>
                  handleQuickSearch(item)
                }
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          ERROR
      ========================== */}

      {errorMessage && (

        <div className="error-box">

          <strong>
            Something went wrong
          </strong>

          <span>
            {errorMessage}
          </span>

        </div>

      )}


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="content">

        {/* =========================
            RESULTS HEADER
        ========================== */}

        <div className="section-header">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              {query || "Discover"}
            </h2>

          </div>

          <div className="result-count">

            {photos.length}

            <span>
              photos
            </span>

          </div>

        </div>


        {/* =========================
            EMPTY STATE
        ========================== */}

        {!isSearching &&
          photos.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">
                ✦
              </div>

              <h3>
                Start exploring
              </h3>

              <p>
                Search for something above
                to discover beautiful
                photos and videos.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleQuickSearch(
                    "Nature"
                  )
                }
              >
                Explore Nature
              </button>

            </div>
          )}


        {/* =========================
            LOADING
        ========================== */}

        {isSearching && (

          <div className="loading-grid">

            {Array
              .from({ length: 8 })
              .map((_, index) => (

                <div
                  key={index}
                  className="skeleton"
                />

              ))}

          </div>

        )}


        {/* =========================
            PHOTO GRID
        ========================== */}

        {!isSearching &&
          photos.length > 0 && (

            <Grid
              items={photos}

              getKey={(photo) =>
                String(photo.id)
              }

              renderItem={(photo) => (

                <button
                  type="button"

                  className="photo-card"

                  onClick={() =>
                    setSelectedPhoto(
                      photo
                    )
                  }
                >

                  <img
                    src={
                      photo.src.large
                    }

                    alt={
                      photo.alt ||
                      "Pexels photo"
                    }
                  />

                  <div className="photo-info">

                    <span>
                      {photo.photographer}
                    </span>

                    <span className="view-icon">
                      ↗
                    </span>

                  </div>

                </button>

              )}

            />

          )}


        {/* =========================
            REELS
        ========================== */}

        {reelItems.length > 0 && (

          <section className="reels-section">

            <div className="section-header">

              <div>

                <p className="section-label">
                  EXPERIENCE
                </p>

                <h2>
                  Reels
                </h2>

              </div>

              <div className="video-count">

                {reelItems.length}

                <span>
                  videos
                </span>

              </div>

            </div>


            <p className="section-description">
              Swipe through video results
              from Pexels
            </p>


            <div className="reels-container">

              <ReelSwiper
                items={reelItems}

                onActiveChange={(
                  index
                ) => {

                  console.log(
                    "Active reel:",
                    index
                  );

                }}

                showControls={true}

                className="media-reel"

                itemClassName="media-reel-item"
              />

            </div>

          </section>

        )}


        {/* =========================
            NO VIDEOS
        ========================== */}

        {!videosLoading &&
          videos.length === 0 &&
          photos.length > 0 && (

            <section className="no-video-section">

              <div className="no-video-icon">
                ▶
              </div>

              <div>

                <h3>
                  No videos found
                </h3>

                <p>
                  Try another search to
                  discover video reels.
                </p>

              </div>

            </section>

          )}

      </main>


      {/* =========================
          LIGHTBOX
      ========================== */}

      <Lightbox
        open={
          selectedPhoto !== null
        }

        onClose={() =>
          setSelectedPhoto(null)
        }

        className="media-lightbox"

        contentClassName="media-lightbox-content"
      >

        {selectedPhoto && (

          <div className="lightbox-inner">

            <img
              src={
                selectedPhoto
                  .src
                  .large2x
              }

              alt={
                selectedPhoto.alt ||
                "Pexels photo"
              }
            />

            <div className="lightbox-details">

              <div>

                <span>
                  PHOTOGRAPHER
                </span>

                <strong>
                  {
                    selectedPhoto
                      .photographer
                  }
                </strong>

              </div>

              <a
                href={
                  selectedPhoto
                    .photographer_url
                }

                target="_blank"

                rel="noreferrer"
              >
                View photographer ↗
              </a>

            </div>

          </div>

        )}

      </Lightbox>

    </div>
  );
}

export default App;

