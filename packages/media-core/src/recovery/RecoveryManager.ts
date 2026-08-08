export interface RecoveryOptions {

    maxRetries:number;

    retryDelay:number;

}



export class RecoveryManager {


    private maxRetries:number;

    private retryDelay:number;

    private attempts:number = 0;



    constructor(
        options:RecoveryOptions
    ){

        this.maxRetries =
            options.maxRetries;


        this.retryDelay =
            options.retryDelay;

    }




    public async recover(
        callback:()=>Promise<boolean>
    ):Promise<boolean>{


        while(
            this.attempts < this.maxRetries
        ){


            this.attempts++;


            console.log(
                `Recovery attempt ${this.attempts}/${this.maxRetries}`
            );



            await this.delay();



            const success =
                await callback();



            if(success){


                console.log(
                    "Recovery successful"
                );


                this.reset();


                return true;

            }

        }



        console.log(
            "Recovery failed"
        );


        return false;

    }





    private delay(){

        return new Promise(
            resolve=>
                setTimeout(
                    resolve,
                    this.retryDelay
                )
        );

    }





    public reset(){

        this.attempts = 0;

    }


}