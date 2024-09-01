import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/not-found";
import NavBar from "./components/nav-bar";
import { globalStore } from "./store/global-store";
import { Provider } from "react-redux";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages: Record<string, { default: FC }> = import.meta.glob("./pages/*.tsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
    const match = path.match(/\.\/pages\/(.*)\.tsx$/);
    const name = match ? match[1] : "";
    return {
        name,
        path: name === "home" ? "/" : `/${name.toLowerCase()}`,
        component: pages[path].default,
    };
});

export default function Router() {
    return (
        <Provider store={globalStore}>
            <div className="container mx-auto max-w-screen-lg">
                <NavBar routes={routes} />
                <Routes>
                    {routes.map(({ path, component: RouteComp }) => {
                        return <Route key={path} path={path} element={<RouteComp />} />;
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Provider>
    );
}
