import { EventEmitter } from "../emitter/EventEmitter.js";

import type { MediaEvent } from "../types/events.js";
import type { MediaSource } from "./MediaSource.js";
import type { MediaOptions } from "./MediaOptions.js";
import {
    ErrorManager
} from "../error/ErrorManager.js";
import {
    RecoveryManager
} from "../recovery/RecoveryManager.js";

import type {
    PlayerError
} from "../error/ErrorManager.js";
import {
    PlayerState
} from "./PlayerState.js";


import {
    QualityManager
} from "../quality/QualityManager.js";


import {
    NetworkMonitor
} from "../network/NetworkMonitor.js";


import {
    ABRController
} from "../quality/ABRController.js";



export class MediaPlayer {


    private emitter: EventEmitter;

    private errorManager: ErrorManager;
    private options: MediaOptions;

    private recoveryManager: RecoveryManager;

    private state: PlayerState =
        PlayerState.IDLE;


    private source:
        MediaSource | null = null;


    private currentTime:number = 0;


    private duration:number = 0;


    private volume:number = 100;


    private playbackRate:number = 1;


    private muted:boolean = false;


    private loop:boolean = false;



    // ABR

    private qualityManager: QualityManager;


    private networkMonitor: NetworkMonitor;


    private abrController: ABRController;





    constructor(
        options:MediaOptions = {}
    ){


        this.options = options;


        this.emitter =
            new EventEmitter();
           
        this.errorManager = 
           new ErrorManager(3);    



        this.volume =
            options.volume ?? 100;




        this.qualityManager =
        new QualityManager([


            {
                id:"360",
                label:"360p",
                bitrate:800,
                width:640,
                height:360
            },


            {
                id:"720",
                label:"720p",
                bitrate:2500,
                width:1280,
                height:720
            },


            {
                id:"1080",
                label:"1080p",
                bitrate:5000,
                width:1920,
                height:1080
            }


        ]);


        this.recoveryManager =
new RecoveryManager({

    maxRetries:3,

    retryDelay:1000

});

this.errorManager.on(
    "error",
    (event)=>{


        this.emitter.emit(
            event
        );


    }
);


        this.networkMonitor =
            new NetworkMonitor();





        this.abrController =
            new ABRController(
                this.qualityManager,
                this.networkMonitor
            );





        /*
          ABR Quality Change Bridge
        */


        this.abrController
        .onQualityChange(
            (event)=>{


                this.emit({

                    id:Date.now(),

                    type:"qualitychange",

                    timestamp:new Date(),

                    previous:
                        event.previous,

                    current:
                        event.current,

                    bandwidth:
                        event.bandwidth

                } as MediaEvent);



            }
        );






        if(options.autoQuality){

            this.enableAutoQuality(true);

        }


    }







    public on(
        event:any,
        callback:(event:MediaEvent)=>void
    ){


        this.emitter.on(
            event,
            callback
        );


    }



    




    private emit(
        event:MediaEvent
    ){


        this.emitter.emit(
            event
        );


    }









    public load(
        source:MediaSource
    ){


        this.source =
            source;


        this.duration =
            source.duration ?? 0;



        console.log(
            `Loaded ${source.type}: ${source.url}`
        );


        this.emit({

            id:Date.now(),

            type:"load",

            timestamp:new Date()

        });


    }







    public play(){


        this.state =
            PlayerState.PLAYING;



        console.log(
            "Playing media"
        );



        this.emit({

            id:Date.now(),

            type:"play",

            timestamp:new Date()

        });



    }







    public pause(){


        this.state =
            PlayerState.PAUSED;



        console.log(
            "Paused media"
        );



        this.emit({

            id:Date.now(),

            type:"pause",

            timestamp:new Date()

        });


    }








    public stop(){


        this.state =
            PlayerState.STOPPED;



        console.log(
            "Stopped media"
        );



        this.emit({

            id:Date.now(),

            type:"stop",

            timestamp:new Date()

        });


    }








    /*
        ABR APIs
    */



    public enableAutoQuality(
        enabled:boolean
    ){


        if(enabled){


            this.abrController.enable();


            this.networkMonitor.start();


        }
        else{


            this.abrController.disable();


            this.networkMonitor.stop();


        }


    }








    public setNetworkSpeed(
        speed:number
    ){


        this.networkMonitor
        .setBandwidth(speed);


    }








    public setQuality(
        id:string
    ){


        this.qualityManager
        .setQuality(id);


    }








    public getQuality(){


        return this.qualityManager
        .getCurrentQuality();


    }




/*
    Get all available qualities
*/

public getAvailableQualities(){

    return this
        .qualityManager
        .getQualities();

}



/*
    Check Auto Quality status
*/

public isAutoQualityEnabled(){

    return this
        .abrController
        .isEnabled();

}



/*
    Disable / Enable Auto Quality
*/

public setAutoQuality(
    enabled:boolean
){

    this.enableAutoQuality(enabled);

}

public triggerError(
    error: PlayerError
){

    return this.errorManager
        .handleError(error);

}

public async recoverPlayback(){


    const currentPosition =
        this.currentTime;



    console.log(
        "Recovery started"
    );



    const recovered =
        await this.recoveryManager.recover(
            async()=>{


                console.log(
                    "Reloading media..."
                );



                this.currentTime =
                    currentPosition;



                console.log(
                    "Restored position:",
                    currentPosition
                );



                return true;

            }
        );



    if(recovered){


        this.emitter.emit({

            id:
            Date.now(),


            type:
            "recovery",


            timestamp:
            new Date()

        });


    }


}


public retry(){

    return this.errorManager
        .retry();

}




public resetRetry(){

    this.errorManager
        .resetRetry();

}

    public destroy(){


        this.networkMonitor.stop();


        console.log(
            "MediaPlayer destroyed"
        );


    }


}