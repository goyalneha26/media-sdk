import {
  useCallback,
  useContext,
  useState
} from "react";

import {
  MediaContext
} from "../context.js";

import type {
  PexelsVideo
} from "@media-sdk/core";


export function useMediaVideos() {

  const context =
    useContext(MediaContext);


  if (!context) {

    throw new Error(
      "useMediaVideos must be used inside MediaProvider"
    );

  }


  const {
    client
  } = context;


  const [
    videos,
    setVideos
  ] = useState<PexelsVideo[]>([]);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    error,
    setError
  ] = useState<unknown>(null);


  const searchVideos =
    useCallback(
      async (
        query: string
      ) => {

        setLoading(true);

        setError(null);


        try {

          console.log(
            "Searching videos:",
            query
          );


          const response =
            await client.searchVideos(
              query
            );


          console.log(
            "VIDEO API RESPONSE:",
            response
          );


          console.log(
            "VIDEOS:",
            response.videos
          );


          console.log(
            "VIDEO COUNT:",
            response.videos?.length ?? 0
          );


          setVideos(
            response.videos ?? []
          );


        } catch (err) {

          console.error(
            "Video search failed:",
            err
          );


          setError(err);

          setVideos([]);


        } finally {

          setLoading(false);

        }

      },
      [client]
    );


  return {

    videos,

    loading,

    error,

    searchVideos

  };

}