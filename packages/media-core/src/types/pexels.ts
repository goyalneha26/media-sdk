export interface PexelsPhotoSource {

    original: string;

    large2x: string;

    large: string;

    medium: string;

    small: string;

    portrait: string;

    landscape: string;

    tiny: string;

}



export interface PexelsPhoto {


    id: number;


    width: number;


    height: number;


    url: string;


    photographer: string;


    photographer_url: string;


    photographer_id: number;


    avg_color: string;


    src: PexelsPhotoSource;


    liked: boolean;


    alt: string;

}

export interface PexelsVideoFile {
  id: number;
  quality: string;
  file_type: string;
  width?: number;
  height?: number;
  fps?: number;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: string | null;
  tags: string[];
  url: string;
  image: string;
  avg_color: string | null;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

export interface PexelsVideoResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: PexelsVideo[];
  next_page?: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: string;
  file_type: string;
  width?: number;
  height?: number;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: string | null;
  tags: string[];
  url: string;
  image: string;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

export interface PexelsVideoResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: PexelsVideo[];
  url: string;
  next_page?: string;
}

export interface PexelsPhotoResponse {


    page: number;


    per_page: number;


    photos: PexelsPhoto[];


    total_results: number;


    next_page?: string;

}