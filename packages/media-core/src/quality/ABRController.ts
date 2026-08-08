import {
    QualityManager
} from "./QualityManager.js";


import {
    NetworkMonitor
} from "../network/NetworkMonitor.js";



export interface QualityChangeEvent {


    previous:string | undefined;


    current:string | undefined;


    bandwidth:number;


}






type QualityListener =
(event:QualityChangeEvent)=>void;







export class ABRController {



    private qualityManager:
        QualityManager;



    private networkMonitor:
        NetworkMonitor;



    private enabled:boolean=false;



    private listeners:
        QualityListener[]=[];








    constructor(

        qualityManager:QualityManager,

        networkMonitor:NetworkMonitor

    ){


        this.qualityManager =
            qualityManager;


        this.networkMonitor =
            networkMonitor;


    }







    public onQualityChange(
        listener:QualityListener
    ){


        this.listeners.push(
            listener
        );


    }







    private emitQualityChange(
        event:QualityChangeEvent
    ){


        this.listeners.forEach(
            listener =>
            listener(event)
        );


    }









    public enable(){


        if(this.enabled)
            return;



        this.enabled=true;



        this.qualityManager
        .enableAutoQuality(true);




        this.networkMonitor.on(
            event=>{


                this.handleBandwidth(
                    event.bandwidth
                );


            }
        );



        console.log(
            "ABR Auto Switching Enabled"
        );


    }




public isEnabled(){

    return this.enabled;

}



    private handleBandwidth(
        bandwidth:number
    ){



        const oldQuality =
            this.qualityManager
            .getCurrentQuality();




        const newQuality =
            this.qualityManager
            .selectBestQuality(
                bandwidth
            );





        if(
            oldQuality?.id !== newQuality?.id
        ){


            console.log(
    `Quality switched: ${oldQuality?.label} -> ${newQuality?.label}`
);


            this.emitQualityChange({

                previous:
                    oldQuality?.label,


                current:
                    newQuality?.label,


                bandwidth

            });


        }



    }






    public disable(){


        this.enabled=false;


        this.qualityManager
        .enableAutoQuality(false);


        console.log(
            "ABR Auto Switching Disabled"
        );


    }



}