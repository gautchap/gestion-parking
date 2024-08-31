/* global process */
/* eslint-disable no-console */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

export async function createServer(
    root = process.cwd(),
    isProduction = process.env.NODE_ENV === "production",
    hmrPort
) {
    const templateHtml = isProduction ? await fs.readFile(resolve("dist/client/index.html"), "utf8") : "";
    const ssrManifest = isProduction
        ? await fs.readFile(resolve("dist/client/.vite/ssr-manifest.json"), "utf8")
        : undefined;

    const app = express();

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite;
    if (isProduction) {
        const compression = (await import("compression")).default;
        const sirv = (await import("sirv")).default;
        app.use(compression());
        app.use(base, sirv("./dist/client", { extensions: [] }));
    } else {
        vite = await (
            await import("vite")
        ).createServer({
            root,
            server: {
                middlewareMode: true,
                watch: {
                    usePolling: true,
                    interval: 100,
                },
                hmr: {
                    port: hmrPort,
                },
            },
            appType: "custom",
            base,
        });
        app.use(vite.middlewares);
    }

    app.use("*", async (req, res) => {
        try {
            const url = req.originalUrl;

            let template;
            let render;
            if (isProduction) {
                template = templateHtml;
                // eslint-disable-next-line import/extensions
                render = (await import("./dist/server/entry-server.js")).render;
            } else {
                template = await fs.readFile(resolve("index.html"), "utf8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
            }

            const rendered = await render(url, ssrManifest);

            const html = template.replace(`<!--app-html-->`, rendered);

            res.status(200).set({ "Content-Type": "text/html" }).send(html);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !isProduction && vite.ssrFixStacktrace(error);
            console.log(error.stack);
            res.status(500).end(error.stack);
        }
    });
    return { app, vite };
}

// eslint-disable-next-line unicorn/prefer-top-level-await, github/no-then
createServer().then(({ app }) => app.listen(port, () => console.log(`http://localhost:${port}`)));
