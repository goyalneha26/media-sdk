import React, {
    useMemo
}
from "react";


import {

    AuthManager,

    CacheManager,

    PexelsClient,

    EventEmitter

}
from "@media-sdk/core";


import {

    MediaContext

}
from "./context.js";




interface MediaProviderProps {


    apiKey:string;


    children:React.ReactNode;


}




export function MediaProvider({

    apiKey,

    children

}:MediaProviderProps){



    const value =
    useMemo(()=>{



        const auth =
        new AuthManager({

            apiKey

        });



        const cache =
        new CacheManager();



        const emitter =
        new EventEmitter();




        const client =
        new PexelsClient(

            auth,

            cache

        );




        return {


            client,


            emitter


        };



    },[apiKey]);





    return (

        <MediaContext.Provider

            value={value}

        >

            {children}


        </MediaContext.Provider>


    );



}