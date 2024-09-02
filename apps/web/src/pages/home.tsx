import type { Ticket } from "@repo/schemas/index";
import { addTicket, removeTicket } from "../reducer/ticketSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { deleteTicket, getTicket } from "../services/ticket.service";
import Place from "../components/place";
import Button from "../components/button";
import Title from "../components/title";

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
            <Title title="Accueil" />
            <div className="flex flex-col mx-auto my-3 space-y-2">
                {ticket ? (
                    <>
                        <h1 className="text-center">Votre place</h1>
                        <table className="border-collapse">
                            <tbody className="flex flex-wrap justify-center">
                                <Place
                                    place={{ id: ticket.placeId, ticket: ticket.ticketId, free: false }}
                                    ticket={ticket}
                                />
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <Button onClick={() => _removeTicket(ticket)}>Quitter le parking</Button>
                        </div>
                    </>
                ) : (
                    <div className="p-4 mx-auto space-y-4 border rounded-lg shadow-sm max-w-80">
                        <div>
                            <h1 className="text-left">Parking</h1>
                            <p className="text-left">Bienvenue sur le parking</p>
                        </div>
                        <img className="w-full mx-auto rounded-lg" src="/parking.webp" alt="parking" />

                        <div className="flex justify-end">
                            <Button onClick={getPlace}>Prendre un ticket</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
