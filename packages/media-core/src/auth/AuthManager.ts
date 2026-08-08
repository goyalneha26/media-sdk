import type {
    PexelsConfig
}
from "../config/PexelsConfig.js";


import {
    DEFAULT_PEXELS_URL
}
from "../config/PexelsConfig.js";


export class AuthManager {


    private apiKey:string;

    private baseUrl:string;



    constructor(
        config:PexelsConfig
    ){

        if(!config.apiKey){

            throw new Error(
                "Pexels API key is required"
            );

        }


        this.apiKey = config.apiKey;


        this.baseUrl =
        config.baseUrl ??
        DEFAULT_PEXELS_URL;

    }



    public getApiKey():string{

        return this.apiKey;

    }



    public getBaseUrl():string{

        return this.baseUrl;

    }



    public getHeaders(){

        return {

            Authorization:this.apiKey,

            "Content-Type":
            "application/json"

        };

    }


}