export type MediaEventType =

    | "load"
    | "play"
    | "pause"
    | "stop"
    | "ended"
    | "timeupdate"
    | "error"
    | "recovery"

    // Buffer events
    | "bufferstart"
    | "bufferprogress"
    | "bufferend"

    // Quality events
    | "qualitychange";





export interface MediaEvent {


    id:number;


    type:MediaEventType;


    timestamp:Date;



    // Quality Change

    previous?:string;


    current?:string;


    bandwidth?:number;




    // Buffer

    percent?:number;


    buffered?:number;


    isBuffering?:boolean;


    completed?:boolean;



    // Playback

    currentTime?:number;


    duration?:number;



    error?:string;


}