import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Router from "./router";

export function render(url: string) {
    return renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <Router />
            </StaticRouter>
        </React.StrictMode>
    );
}
