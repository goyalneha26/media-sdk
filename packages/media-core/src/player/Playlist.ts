import type { MediaSource } from "./MediaSource.js";


export enum RepeatMode {
  NONE = "none",
  ONE = "one",
  ALL = "all",
}



export class Playlist {


  private items: MediaSource[] = [];


  private currentIndex = -1;


  private repeatMode: RepeatMode = RepeatMode.NONE;



  public load(
    items: MediaSource[]
  ): void {

    this.items = [...items];

    this.currentIndex =
      items.length > 0 ? 0 : -1;

  }




  public add(
    item: MediaSource
  ): void {

    this.items.push(item);


    if (this.currentIndex === -1) {

      this.currentIndex = 0;

    }

  }




  public remove(
    index: number
  ): void {


    if (
      index < 0 ||
      index >= this.items.length
    ) {

      return;

    }



    this.items.splice(
      index,
      1
    );



    if (
      this.items.length === 0
    ) {

      this.currentIndex = -1;

      return;

    }



    if (
      this.currentIndex >= this.items.length
    ) {

      this.currentIndex =
        this.items.length - 1;

    }

  }





  public clear(): void {

    this.items = [];

    this.currentIndex = -1;

  }





  public current(): MediaSource | null {


    if (
      this.currentIndex === -1
    ) {

      return null;

    }


    return this.items[this.currentIndex];

  }





  public next(): MediaSource | null {


    if (
      this.items.length === 0
    ) {

      return null;

    }



    // Repeat current song/video

    if (
      this.repeatMode === RepeatMode.ONE
    ) {

      return this.current();

    }




    if (
      this.currentIndex <
      this.items.length - 1
    ) {


      this.currentIndex++;


    }

    else if (
      this.repeatMode === RepeatMode.ALL
    ) {


      this.currentIndex = 0;


    }



    return this.current();

  }





  public previous(): MediaSource | null {


    if (
      this.items.length === 0
    ) {

      return null;

    }



    if (
      this.repeatMode === RepeatMode.ONE
    ) {

      return this.current();

    }





    if (
      this.currentIndex > 0
    ) {


      this.currentIndex--;


    }

    else if (
      this.repeatMode === RepeatMode.ALL
    ) {


      this.currentIndex =
        this.items.length - 1;


    }



    return this.current();

  }





  public hasNext(): boolean {


    return (
      this.currentIndex <
      this.items.length - 1
    );

  }





  public hasPrevious(): boolean {


    return (
      this.currentIndex > 0
    );

  }





  public shuffle(): void {


    for (
      let i = this.items.length - 1;
      i > 0;
      i--
    ) {


      const j =
        Math.floor(
          Math.random() * (i + 1)
        );



      [
        this.items[i],
        this.items[j]
      ] = [
        this.items[j],
        this.items[i]
      ];

    }



    this.currentIndex =
      this.items.length > 0 ? 0 : -1;


  }





  public getItems(): MediaSource[] {

    return [
      ...this.items
    ];

  }





  public size(): number {

    return this.items.length;

  }





  public getCurrentIndex(): number {

    return this.currentIndex;

  }





  public setRepeatMode(
    mode: RepeatMode
  ): void {

    this.repeatMode = mode;

  }





  public getRepeatMode(): RepeatMode {

    return this.repeatMode;

  }


}