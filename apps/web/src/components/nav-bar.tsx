import { Link } from "react-router-dom";

type NavBarProps = {
    routes: {
        name: string;
        path: string;
    }[];
};

export default function NavBar({ routes }: NavBarProps) {
    return (
        <nav className="h-12 bg-orange-400">
            <ul className="flex h-full items-center justify-evenly">
                {routes.map(({ name, path }) => {
                    return (
                        <li key={path} className="inline-block">
                            <Link to={path}>{name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
