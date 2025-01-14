"use client";
import { useEffect, useState } from "react";
import Ticket from "../../interfaces/TicketInterface";
import { getStates, updateTicket } from "@/app/utils/api";
import State from "@/app/interfaces/StateInterface";
import { useRouter } from "next/navigation";
import TicketManagement from "./TicketManagement";
import TicketDetails from "../TicketDetails";

type Props = {
    id_user: number,
    id_department: number,
    admin: boolean;
};

const TicketClient: React.FC<{ user: Props, ticket: Ticket }> = ({ user, ticket }: { user: Props, ticket: Ticket }) => {

    const router = useRouter()
    const authorization = user.admin || user.id_user === ticket.created_by || user.id_department === ticket.id_department;

    const [states, setStates] = useState<State[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchStates = async () => {
        setLoading(true)
        try {
            const response = await getStates();
            setStates(response.data);
        } catch (err) {
            console.error('Failed to fetch states', err);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);


    const handleUpdateTicket = async (e: React.FormEvent, state: number, observations: string) => {
        e.preventDefault()
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        if ([2].includes(state) && !observations.trim()) {
            setErrorMessage("Observations are required when rejecting a ticket.")
            setLoading(false);
            return;
        }

        try {
            const new_data = {
                id_state: state,
                id_user: user.id_user,
                observations: ticket.observations ? ticket.observations + "\n" + observations : observations

            }
            const response = await updateTicket(ticket.id, new_data);
            if (response.data.success) {
                setSuccessMessage(response.data.message)
                router.refresh()
            }
            else {
                setErrorMessage(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Failed to update ticket.');
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-gray-900 text-2xl font-bold mb-4">Ticket Details</h1>
            {loading && <p className=" text-gray-500 text-center mb-4">Loading...</p>}
            {!loading && !authorization &&
                <h1 className="text-red-600 text-md font-bold text-center mt-6">
                    Insufficient authorization to view ticket.
                </h1>
            }
            {!loading && authorization &&
                <>
                    <TicketDetails {...ticket} />
                    {
                        // Disallow Ticket Management if the ticket is already Rejected(id=2) or Completed(id=4)
                        ![2, 4].includes(ticket.id_state) && (
                            <>
                                <TicketManagement
                                    ticket_state={ticket.id_state}
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    handleUpdateTicket={handleUpdateTicket}
                                    states={states}
                                />
                            </>

                        )
                    }
                </>
            }
        </div>
    );
};

export default TicketClient;
