import { Link, useLocation } from "react-router-dom";

type NavBarProps = {
    routes: {
        name: string;
        path: string;
    }[];
};

export default function NavBar({ routes }: NavBarProps) {
    const location = useLocation();

    return (
        <nav className="mx-auto my-1 h-12 max-w-xs rounded-full bg-blue-300/50">
            <ul className="flex h-full items-center justify-evenly">
                {routes.map(({ name, path }) => {
                    return (
                        <li key={path} className={`${location.pathname === path ? "text-slate-500" : ""} inline-block`}>
                            <Link to={path}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
