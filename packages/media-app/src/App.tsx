
import { useState } from "react";

import {
    useMediaSearch
} from "@media-sdk/react";

import {
    Grid,
    Lightbox,
    ReelSwiper
} from "@media-sdk/ui-react";

import type {
    PexelsPhoto
} from "@media-sdk/core";


function App() {

    const {
        photos,
        loading,
        error,
        search
    } = useMediaSearch();


    const [
        selectedPhoto,
        setSelectedPhoto
    ] = useState<PexelsPhoto | null>(null);


    const errorMessage =
        error instanceof Error
            ? error.message
            : error
                ? String(error)
                : "";


    /*
     * Create reel items from the
     * photos returned by Pexels.
     */
    const reelItems =
        (photos ?? []).map(
            (
                photo: PexelsPhoto
            ) => (

                <button
                    key={photo.id}

                    type="button"

                    onClick={() => {

                        console.log(
                            "REEL PHOTO CLICKED:",
                            photo.id
                        );

                        setSelectedPhoto(
                            photo
                        );

                    }}

                    style={{
                        width: "100%",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        background:
                            "transparent",
                        cursor: "pointer"
                    }}
                >

                    <img
                        src={
                            photo.src.large
                        }

                        alt={
                            photo.alt ||
                            "Pexels photo"
                        }

                        style={{
                            width: "100%",
                            height: "420px",
                            objectFit: "cover",
                            display: "block",
                            borderRadius: "12px"
                        }}
                    />

                </button>

            )
        );


    return (

        <main
            style={{
                minHeight: "100vh",
                padding: "30px",
                background: "#f5f5f5",
                fontFamily:
                    "Arial, sans-serif"
            }}
        >

            <h1>
                Media SDK
            </h1>


            <button
                type="button"

                onClick={() =>
                    search("nature")
                }

                disabled={loading}

                style={{
                    padding:
                        "12px 24px",

                    border: "none",

                    borderRadius:
                        "6px",

                    background: "#111",

                    color: "#fff",

                    cursor: loading
                        ? "not-allowed"
                        : "pointer",

                    marginBottom:
                        "20px"
                }}
            >

                {loading
                    ? "Searching..."
                    : "Search Nature"}

            </button>


            {errorMessage && (

                <p
                    style={{
                        color: "red"
                    }}
                >
                    Error: {errorMessage}
                </p>

            )}


            <p>
                Photos returned:{" "}
                {photos?.length ?? 0}
            </p>


            {/* =========================
                GRID
            ========================== */}

            <h2>
                Photo Grid
            </h2>


            <Grid
                items={
                    photos ?? []
                }

                getKey={(
                    photo: PexelsPhoto
                ) =>
                    String(photo.id)
                }

                renderItem={(
                    photo: PexelsPhoto
                ) => (

                    <button
                        type="button"

                        onClick={() => {

                            console.log(
                                "PHOTO CLICKED:",
                                photo.id
                            );

                            setSelectedPhoto(
                                photo
                            );

                        }}

                        style={{
                            width: "100%",
                            border: "none",
                            padding: 0,
                            margin: 0,
                            background:
                                "transparent",
                            cursor:
                                "pointer",
                            display:
                                "block"
                        }}
                    >

                        <img
                            src={
                                photo.src.medium
                            }

                            alt={
                                photo.alt ||
                                "Pexels photo"
                            }

                            style={{
                                width:
                                    "100%",

                                height:
                                    "250px",

                                objectFit:
                                    "cover",

                                display:
                                    "block",

                                borderRadius:
                                    "8px"
                            }}
                        />

                    </button>

                )}
            />


            {/* =========================
                REEL SWIPER
            ========================== */}

            {reelItems.length > 0 && (

                <section
                    style={{
                        marginTop:
                            "50px"
                    }}
                >

                    <h2>
                        Reel Swiper
                    </h2>


                    <p
                        style={{
                            color:
                                "#555"
                        }}
                    >
                        Use the arrows or
                        keyboard arrow keys
                        to navigate.
                    </p>


                    <ReelSwiper
                        items={
                            reelItems
                        }

                        onActiveChange={(
                            index
                        ) => {

                            console.log(
                                "ACTIVE REEL:",
                                index
                            );

                        }}

                        showControls={
                            true
                        }

                        className="media-reel"

                        itemClassName=
                            "media-reel-item"
                    />

                </section>

            )}


            {/* =========================
                LIGHTBOX
            ========================== */}

            <Lightbox
                open={
                    selectedPhoto !==
                    null
                }

                onClose={() => {

                    console.log(
                        "LIGHTBOX CLOSED"
                    );

                    setSelectedPhoto(
                        null
                    );

                }}

                className=
                    "media-lightbox"

                contentClassName=
                    "media-lightbox-content"
            >

                {selectedPhoto && (

                    <div
                        style={{
                            textAlign:
                                "center"
                        }}
                    >

                        <img
                            src={
                                selectedPhoto
                                    .src
                                    .large
                            }

                            alt={
                                selectedPhoto.alt ||
                                "Pexels photo"
                            }

                            style={{
                                maxWidth:
                                    "90vw",

                                maxHeight:
                                    "80vh",

                                objectFit:
                                    "contain",

                                borderRadius:
                                    "8px"
                            }}
                        />


                        <p
                            style={{
                                color:
                                    "#fff",

                                marginTop:
                                    "10px"
                            }}
                        >
                            {
                                selectedPhoto.alt ||
                                "Pexels photo"
                            }
                        </p>

                    </div>

                )}

            </Lightbox>

        </main>

    );

}


export default App;

