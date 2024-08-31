import { addTicket } from "../reducer/ticketSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { getTicket } from "../services/ticket.service";

export default function Home() {
    const dispatch = useAppDispatch();

    const getPlace = async () => {
        const place = await getTicket();
        return dispatch(addTicket(place));
    };

    return (
        <>
            <button onClick={getPlace}>Get Ticket</button>
        </>
    );
}
