export interface NetworkEvent {


    bandwidth:number;


    timestamp:Date;


}





type NetworkListener =
(
    event:NetworkEvent
)=>void;






export class NetworkMonitor {



    private bandwidth:number = 0;



    private listeners:
        NetworkListener[] = [];



    private interval:
        ReturnType<typeof setInterval> | null = null;






    public on(
        listener:NetworkListener
    ){


        this.listeners.push(
            listener
        );


    }







    private emit(){


        const event:NetworkEvent = {


            bandwidth:
                this.bandwidth,


            timestamp:
                new Date()


        };



        this.listeners.forEach(
            listener =>
            listener(event)
        );


    }







    public start(){


        console.log(
            "Network monitoring started"
        );



        this.interval =
        setInterval(()=>{


            this.simulateBandwidth();



        },2000);



    }







    private simulateBandwidth(){



        const speeds = [


            800,
            1500,
            3000,
            5000,
            8000


        ];



        const index =
            Math.floor(
                Math.random()
                *
                speeds.length
            );



        this.bandwidth =
            speeds[index];




        console.log(
            `Network speed: ${this.bandwidth} kbps`
        );



        this.emit();


    }







    public setBandwidth(
        speed:number
    ){


        this.bandwidth =
            speed;



        console.log(
            `Network speed manually set: ${speed} kbps`
        );



        this.emit();


    }







    public getBandwidth(){


        return this.bandwidth;


    }







    public stop(){


        if(this.interval){


            clearInterval(
                this.interval
            );


            this.interval=null;


        }



        console.log(
            "Network monitoring stopped"
        );


    }



}
