export class CacheManager {


    private cache:
    Map<string, any> = new Map();



    private expiry:
    Map<string, number> = new Map();



    constructor(
        private ttl:number = 60000
    ){}



    public set<T>(
        key:string,
        value:T
    ){

        this.cache.set(
            key,
            value
        );


        this.expiry.set(
            key,
            Date.now()+this.ttl
        );

    }



    public get<T>(
        key:string
    ):T | null{


        const expire =
        this.expiry.get(key);



        if(!expire){
            return null;
        }



        if(Date.now()>expire){

            this.cache.delete(key);

            this.expiry.delete(key);

            return null;

        }



        return this.cache.get(key);

    }



    public has(
        key:string
    ){

        return this.get(key)!==null;

    }



    public clear(){

        this.cache.clear();

        this.expiry.clear();

    }

}