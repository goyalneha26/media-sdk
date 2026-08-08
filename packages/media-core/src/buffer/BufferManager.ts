import type { MediaEvent } from "../types/events.js";


type BufferListener =
(
    event:MediaEvent
)=>void;



export interface BufferState {


    buffered:number;


    isBuffering:boolean;


    completed:boolean;


}




export class BufferManager {


    private state:BufferState = {


        buffered:0,


        isBuffering:false,


        completed:false


    };



    private listeners:
        BufferListener[] = [];



    private interval:
        ReturnType<typeof setInterval> | null = null;






    public on(
        listener:BufferListener
    ){

        this.listeners.push(
            listener
        );

    }







    private emit(
        event:MediaEvent
    ){

        this.listeners.forEach(
            listener=>listener(event)
        );

    }







    public startBuffering(){


        this.state = {


            buffered:0,


            isBuffering:true,


            completed:false


        };



        console.log(
            "Buffer started"
        );



        this.emit({


            id:Date.now(),


            type:"bufferstart",


            timestamp:new Date()


        });






        this.interval =
        setInterval(()=>{



            this.state.buffered +=20;





            if(
                this.state.buffered >=100
            ){


                this.state.buffered=100;


                this.state.isBuffering=false;


                this.state.completed=true;



                console.log(
                    "Buffer completed"
                );



                this.emit({


                    id:Date.now(),


                    type:"bufferend",


                    timestamp:new Date(),


                    percent:100


                });



                this.stop();


                return;


            }






            console.log(
                `Buffer progress: ${this.state.buffered}%`
            );




            this.emit({


                id:Date.now(),


                type:"bufferprogress",


                timestamp:new Date(),


                percent:this.state.buffered


            });



        },500);


    }







    public getState(){


        return {

            ...this.state

        };


    }








    public isReady(){


        return this.state.completed;


    }







    public reset(){


        this.stop();


        this.state={


            buffered:0,


            isBuffering:false,


            completed:false


        };


    }







    private stop(){


        if(this.interval){


            clearInterval(
                this.interval
            );


            this.interval=null;


        }


    }


}