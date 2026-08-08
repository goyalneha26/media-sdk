import { EventEmitter } from "../emitter/EventEmitter.js";

import type {
    MediaEvent
} from "../types/events.js";



export enum ErrorCode {


    NETWORK_ERROR =
        "NETWORK_ERROR",


    MEDIA_ERROR =
        "MEDIA_ERROR",


    SOURCE_ERROR =
        "SOURCE_ERROR",


    UNKNOWN_ERROR =
        "UNKNOWN_ERROR"


}






export interface PlayerError {


    code:ErrorCode;


    message:string;


    fatal:boolean;


    timestamp:Date;


}








export class ErrorManager {



    private emitter:EventEmitter;



    private retryCount:number = 0;


    private maxRetries:number;



    constructor(
        maxRetries:number = 3
    ){


        this.emitter =
            new EventEmitter();


        this.maxRetries =
            maxRetries;


    }







    public on(
        event:MediaEvent["type"],
        callback:(event:MediaEvent)=>void
    ){


        this.emitter.on(
            event,
            callback
        );


    }








    public handleError(
        error:PlayerError
    ){



        console.log(
            "Error detected:",
            error.message
        );




        const event:MediaEvent = {


            id:Date.now(),


            type:"error",


            timestamp:new Date(),


            error:
                error.message



        };



        this.emitter.emit(
            event
        );



        return event;


    }








    public canRetry(){


        return (
            this.retryCount <
            this.maxRetries
        );


    }








    public retry(){


        if(this.canRetry()){


            this.retryCount++;


            console.log(
                `Retry attempt ${this.retryCount}/${this.maxRetries}`
            );


            return true;


        }



        console.log(
            "Maximum retry reached"
        );



        return false;


    }








    public resetRetry(){


        this.retryCount = 0;


    }




}