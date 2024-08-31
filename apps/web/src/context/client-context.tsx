import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export const ClientContext = ({ children }: { children: ReactNode }) => {
    const [clientLoaded, setClientLoaded] = useState(false);

    useEffect(() => {
        setClientLoaded(true);

        return () => setClientLoaded(false);
    }, []);

    if (!clientLoaded) return null;

    return <>{children}</>;
};
