export interface MediaSource {
  url: string;
  type: "audio" | "video";
  duration: number;
}