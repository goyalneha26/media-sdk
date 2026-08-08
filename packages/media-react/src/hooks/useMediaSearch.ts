import {
  useCallback,
  useContext,
  useState
} from "react";

import {
  MediaContext
} from "../context.js";

import type {
  PexelsPhoto,
  PexelsVideo
} from "@media-sdk/core";

export function useMediaSearch() {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error(
      "useMediaSearch must be used inside MediaProvider"
    );
  }

  const { client } = context;

  const [photos, setPhotos] =
    useState<PexelsPhoto[]>([]);

  const [videos, setVideos] =
    useState<PexelsVideo[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<unknown>(null);

  const search = useCallback(
    async (query: string) => {
      setLoading(true);
      setError(null);

      try {
        const [
          photoResponse,
          videoResponse
        ] = await Promise.all([
          client.searchPhotos(query),
          client.searchVideos(query)
        ]);

        setPhotos(
          photoResponse.photos ?? []
        );

        setVideos(
          videoResponse.videos ?? []
        );
      } catch (err) {
        console.error(
          "Media search failed:",
          err
        );

        setError(err);

        setPhotos([]);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return {
    photos,
    videos,
    loading,
    error,
    search
  };
}