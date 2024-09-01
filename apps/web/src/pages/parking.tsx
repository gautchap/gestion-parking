import { useEffect } from "react";
import { getParking } from "../services/parking.service";

export default function Parking() {
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const _parking = await getParking(controller.signal);
            console.log(_parking);
        })();

        return () => controller.abort();
    }, []);
    return <div>Parking</div>;
}
