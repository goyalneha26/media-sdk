import React from "react";
import ReactDOM from "react-dom/client";

import {
    MediaProvider
} from "@media-sdk/react";

import App from "./App.js";


const apiKey =
    import.meta.env.VITE_PEXELS_API_KEY;


ReactDOM.createRoot(
    document.getElementById("root")!
).render(

    <React.StrictMode>

        <MediaProvider
            apiKey={apiKey}
        >

            <App />

        </MediaProvider>

    </React.StrictMode>

);