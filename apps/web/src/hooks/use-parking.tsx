import { useEffect } from "react";
import { getParking } from "../services/parking.service";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { addParking } from "../reducer/parkingSlice";

export default function useParking() {
    const parking = useAppSelector((state) => state.parking.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const _parking = await getParking(controller.signal);
            dispatch(addParking(_parking));
        })();

        return () => controller.abort();
    }, []);
    return parking;
}
