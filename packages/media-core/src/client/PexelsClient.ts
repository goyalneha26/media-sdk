
import {
  AuthManager
} from "../auth/AuthManager.js";

import {
  CacheManager
} from "../cache/CacheManager.js";

import type {
  PexelsPhotoResponse,
  PexelsPhoto,
  PexelsVideoResponse,
  PexelsVideo
} from "../types/pexels.js";


export class PexelsClient {

  private baseUrl: string;

  constructor(
    private auth: AuthManager,
    private cache: CacheManager
  ) {
    this.baseUrl =
      auth.getBaseUrl();
  }


  // =========================================================
  // PHOTOS
  // =========================================================

  async searchPhotos(
    query: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsPhotoResponse> {

    const cacheKey =
      `search:${query}:${page}:${perPage}`;

    const cached =
      this.cache.get<PexelsPhotoResponse>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const url =
      `${this.baseUrl}/search` +
      `?query=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&per_page=${perPage}`;

    const response =
      await fetch(
        url,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels API Error ${response.status}`
      );
    }

    const data =
      await response.json() as PexelsPhotoResponse;

    this.cache.set(
      cacheKey,
      data
    );

    return data;
  }


  async curatedPhotos(
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsPhotoResponse> {

    const cacheKey =
      `curated:${page}:${perPage}`;

    const cached =
      this.cache.get<PexelsPhotoResponse>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const url =
      `${this.baseUrl}/curated` +
      `?page=${page}` +
      `&per_page=${perPage}`;

    const response =
      await fetch(
        url,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels API Error ${response.status}`
      );
    }

    const data =
      await response.json() as PexelsPhotoResponse;

    this.cache.set(
      cacheKey,
      data
    );

    return data;
  }


  async getPhoto(
    id: number
  ): Promise<PexelsPhoto> {

    const cacheKey =
      `photo:${id}`;

    const cached =
      this.cache.get<PexelsPhoto>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const response =
      await fetch(
        `${this.baseUrl}/photos/${id}`,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels Photo API Error ${response.status}`
      );
    }

    const photo =
      await response.json() as PexelsPhoto;

    this.cache.set(
      cacheKey,
      photo
    );

    return photo;
  }


  // =========================================================
  // VIDEOS
  // =========================================================

  async searchVideos(
    query: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsVideoResponse> {

    const cacheKey =
      `videos:search:${query}:${page}:${perPage}`;

    const cached =
      this.cache.get<PexelsVideoResponse>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const videoBaseUrl =
      this.baseUrl.replace(
        "/v1",
        "/videos"
      );

    const url =
      `${videoBaseUrl}/search` +
      `?query=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&per_page=${perPage}`;

    const response =
      await fetch(
        url,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels Video API Error ${response.status}`
      );
    }

    const data =
      await response.json() as PexelsVideoResponse;

    this.cache.set(
      cacheKey,
      data
    );

    return data;
  }


  async curatedVideos(
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsVideoResponse> {

    const cacheKey =
      `videos:curated:${page}:${perPage}`;

    const cached =
      this.cache.get<PexelsVideoResponse>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const videoBaseUrl =
      this.baseUrl.replace(
        "/v1",
        "/videos"
      );

    const url =
      `${videoBaseUrl}/popular` +
      `?page=${page}` +
      `&per_page=${perPage}`;

    const response =
      await fetch(
        url,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels Video API Error ${response.status}`
      );
    }

    const data =
      await response.json() as PexelsVideoResponse;

    this.cache.set(
      cacheKey,
      data
    );

    return data;
  }


  async getVideo(
    id: number
  ): Promise<PexelsVideo> {

    const cacheKey =
      `video:${id}`;

    const cached =
      this.cache.get<PexelsVideo>(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const videoBaseUrl =
      this.baseUrl.replace(
        "/v1",
        "/videos"
      );

    const response =
      await fetch(
        `${videoBaseUrl}/videos/${id}`,
        {
          headers:
            this.auth.getHeaders()
        }
      );

    if (!response.ok) {
      throw new Error(
        `Pexels Video API Error ${response.status}`
      );
    }

    const video =
      await response.json() as PexelsVideo;

    this.cache.set(
      cacheKey,
      video
    );

    return video;
  }

}

