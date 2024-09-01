import { useEffect } from "react";
import { getParking } from "../services/parking.service";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addParking } from "../reducer/parkingSlice";

export default function Parking() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const _parking = await getParking(controller.signal);
            dispatch(addParking(_parking));
        })();

        return () => controller.abort();
    }, []);
    return <div>Parking</div>;
}
