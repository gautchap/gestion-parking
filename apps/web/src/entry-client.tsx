import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
    document.querySelector("#root") as HTMLElement,
    <React.StrictMode>
        <BrowserRouter>
            <div>Hello world</div>
        </BrowserRouter>
    </React.StrictMode>
);
