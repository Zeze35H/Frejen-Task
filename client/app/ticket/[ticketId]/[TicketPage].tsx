import Nav from "@/app/components/clientComponents/Nav";
import TicketClient from "../../components/clientComponents/Ticket"
import { findOneTicket } from '../../utils/api'
import axios from "axios";

const TicketPage = async ({ params }: { params: { ticketId: string } }) => {
    const resolvedParams = await params; // Await the Promise
    const { ticketId } = resolvedParams;

    let ticket = null;
    let error = "An error has occurred"

    try {
        const response = await findOneTicket(ticketId);
        if (response.data)
            ticket = response.data
    } catch (err) {
        console.error(err)
        if(axios.isAxiosError(err) && err.response?.status === 404)
            error = "Ticket not found"
    }

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-100 p-6">
                {
                    ticket ? <TicketClient ticket={ticket} /> : <h1 className="text-red-600 text-md font-bold text-center mt-6 ">{error}</h1>
                }
            </div>
        </>
    )

};

export default TicketPage;


