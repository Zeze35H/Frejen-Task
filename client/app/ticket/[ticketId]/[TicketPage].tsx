import Nav from "@/app/components/clientComponents/Nav";
import TicketClient from "../../components/clientComponents/Ticket"
import { findOneTicket } from '../../utils/api'
import axios from "axios";
import checkAuth from "@/app/utils/checkAuth";
import UserInterface from "@/app/interfaces/UserInterface";

const TicketPage = async ({ params }: { params: { ticketId: string } }) => {

    const user: UserInterface = await checkAuth();

    const user_data = {
        id_user: user.id,
        id_department: user.id_department,
        admin: user.admin,
    }

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
        if (axios.isAxiosError(err) && err.response?.status === 404)
            error = "Ticket not found"
    }

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-100 p-6">
                {
                    ticket ? <TicketClient user={user_data} ticket={ticket} /> : <h1 className="text-red-600 text-md font-bold text-center mt-6 ">{error}</h1>
                }
            </div>
        </>
    )

};

export default TicketPage;


