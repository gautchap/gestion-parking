import { useAppSelector } from "../hooks/redux-hooks";
import Place from "../components/place";
import useParking from "../hooks/use-parking";

export default function Parking() {
    const ticket = useAppSelector((state) => state.ticket.value);
    const parking = useParking();
    const places = parking?.places?.toSorted((a, b) => a.id - b.id);

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
