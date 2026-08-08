export interface MediaSource {

    original:string;

    medium:string;

    small:string;

}



export interface MediaItem {

    id:number;

    width:number;

    height:number;

    url:string;

    photographer:string;

    src:MediaSource;

}



export interface MediaResponse {

    page:number;

    per_page:number;

    total_results:number;

    photos:MediaItem[];

    next_page?:string;

}