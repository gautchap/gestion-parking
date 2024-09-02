import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Title({ title }: { title: string }) {
    const location = useLocation();
    useEffect(() => {
        document.title = `Gestion Parking - ${title}`;
    }, [location]);
    return null;
}
