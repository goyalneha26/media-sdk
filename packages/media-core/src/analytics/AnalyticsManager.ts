export interface AnalyticsStats {

    plays: number;

    pauses: number;

    stops: number;

    errors: number;

    watchTime: number;

    completions: number;

    lastMedia?: string;

}



export class AnalyticsManager {


    private stats: AnalyticsStats = {


        plays:0,

        pauses:0,

        stops:0,

        errors:0,

        watchTime:0,

        completions:0

    };





    private startTime:number | null = null;





    public recordPlay(
        media?:string
    ):void{


        this.stats.plays++;


        this.stats.lastMedia =
            media;


        this.startTime =
            Date.now();

    }






    public recordPause():void{


        this.stats.pauses++;


        this.calculateWatchTime();

    }






    public recordStop():void{


        this.stats.stops++;


        this.calculateWatchTime();


    }






    public recordComplete():void{


        this.stats.completions++;


        this.calculateWatchTime();


    }






    public recordError():void{


        this.stats.errors++;


    }







    private calculateWatchTime():void{


        if(
            this.startTime
        ){


            const seconds =
                Math.floor(
                    (
                      Date.now()
                      -
                      this.startTime
                    )
                    /
                    1000
                );



            this.stats.watchTime +=
                seconds;



            this.startTime = null;


        }


    }






    public getStats():

    AnalyticsStats {

        this.calculateWatchTime();


        return {

            ...this.stats

        };

    }






   public reset(): void {
    this.stats = {
        plays: 0,
        pauses: 0,
        stops: 0,
        errors: 0,
        watchTime: 0,
        completions: 0
    };

    this.startTime = null;
}

}