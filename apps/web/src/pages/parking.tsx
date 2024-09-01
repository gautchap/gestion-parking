import { useEffect } from "react";
import { getParking } from "../services/parking.service";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { addParking } from "../reducer/parkingSlice";
import Place from "../components/place";

export default function Parking() {
    const ticket = useAppSelector((state) => state.ticket.value);
    const parking = useAppSelector((state) => state.parking.value);
    const dispatch = useAppDispatch();

    const places = parking?.places?.toSorted((a, b) => a.id - b.id);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const _parking = await getParking(controller.signal);
            dispatch(addParking(_parking));
        })();

        return () => controller.abort();
    }, []);

    return (
        <>
            <table className="mx-auto border-collapse">
                <tbody className="flex max-w-screen-md flex-wrap justify-center">
                    {places?.map((place) => <Place key={place.id} place={place} ticket={ticket} />)}
                </tbody>
            </table>
        </>
    );
}
