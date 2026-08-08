export interface QualityLevel {


    id:string;


    label:string;


    bitrate:number;


    width:number;


    height:number;


}





export class QualityManager {



    private qualities:
        QualityLevel[] = [];



    private currentQuality:
        QualityLevel | null = null;



    private autoMode:boolean = true;






    constructor(
        qualities:QualityLevel[] = []
    ){


        this.qualities =
            qualities;


        if(
            qualities.length > 0
        ){

            this.currentQuality =
                qualities[0];

        }


    }







    public addQuality(
        quality:QualityLevel
    ){


        this.qualities.push(
            quality
        );


    }







    public getQualities(){


        return [
            ...this.qualities
        ];


    }







    public getCurrentQuality(){


        return this.currentQuality;


    }








    public setQuality(
        id:string
    ){


        const quality =
            this.qualities.find(
                item =>
                item.id === id
            );



        if(!quality){

            throw new Error(
                `Quality ${id} not found`
            );

        }



        this.currentQuality =
            quality;



        console.log(
            `Quality changed to ${quality.label}`
        );


    }







    public enableAutoQuality(
        value:boolean
    ){


        this.autoMode =
            value;


        console.log(

            value
            ?
            "Auto quality enabled"
            :
            "Manual quality enabled"

        );


    }







    public isAuto(){

        return this.autoMode;

    }







    public selectBestQuality(
        bandwidth:number
    ){


        if(
            !this.autoMode
        ){

            return this.currentQuality;

        }






        let selected =
            this.qualities[0];



        for(
            const quality of this.qualities
        ){


            if(
                quality.bitrate <= bandwidth
            ){

                selected =
                    quality;

            }


        }






        this.currentQuality =
            selected;





        console.log(
            `Auto selected: ${selected.label}`
        );



        return selected;


    }





}