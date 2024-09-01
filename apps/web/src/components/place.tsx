import type { Ticket, Place as PlaceType } from "@repo/schemas/index";

type PlaceProps = {
    place: PlaceType;
    ticket: Ticket | undefined;
};

export default function Place({ place, ticket }: PlaceProps) {
    return (
        <tr
            className={`relative my-2 flex h-28 w-14 items-end justify-center border-x border-t border-black bg-gradient-to-b from-transparent from-30% ${
                place.free ? "to-green-600/5" : ticket?.ticketId === place.ticket ? "to-blue-600/5" : "to-red-600/5"
            }  before:absolute before:bottom-0 before:right-0 before:h-px before:w-3 before:bg-black before:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-3 after:bg-black after:content-['']`}
        >
            <td
                className={`font-bold ${
                    place.free ? "text-green-600" : ticket?.ticketId === place.ticket ? "text-blue-600" : "text-red-600"
                }`}
            >
                {place.free ? null : (
                    <img className="absolute inset-x-0 top-[20%] aspect-square" src="/car.webp" alt="car" />
                )}

                {place.id}
            </td>
        </tr>
    );
}
