import TicketClient from "../../components/clinetComponents/Ticket"
import { findOneTicket } from '../../utils/api'

const TicketPage = async ({ params }: { params: { ticketId: string } }) => {
    const resolvedParams = await params; // Await the Promise
    const { ticketId } = resolvedParams;

    try {
        const response = await findOneTicket(ticketId);
        console.log(response.data)
        if (response.data)
            return <TicketClient ticket={response.data} />
        else
            return <h1 className="text-center mt-6">No ticket found</h1>
    } catch (err) {
        console.error(err)
        return <h1 className="text-center mt-6 text-red-500">An error has occurred</h1>
    }

};

export default TicketPage;


