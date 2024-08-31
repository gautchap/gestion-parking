import type { Ticket } from "@repo/schemas/index";
import { addTicket, removeTicket } from "../reducer/ticketSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { deleteTicket, getTicket } from "../services/ticket.service";

export default function Home() {
    const ticket = useAppSelector((state) => state.ticket.value);
    const dispatch = useAppDispatch();

    const getPlace = async () => {
        const place = await getTicket();
        return dispatch(addTicket(place));
    };

    const _removeTicket = async (_ticket: Ticket) => {
        await deleteTicket(_ticket);
        return dispatch(removeTicket(null));
    };

    return (
        <>
            {ticket ? (
                <button onClick={() => _removeTicket(ticket)}>Delete Ticket</button>
            ) : (
                <button onClick={getPlace}>Get Ticket</button>
            )}
        </>
    );
}
