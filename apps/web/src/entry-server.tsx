import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export function render(url: string) {
    return renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <div>Hello world</div>
            </StaticRouter>
        </React.StrictMode>
    );
}
