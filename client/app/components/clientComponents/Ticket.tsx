"use client";
import { useEffect, useState } from "react";
import Ticket from "../../interfaces/TicketInterface";
import { getStates, updateTicket } from "@/app/utils/api";
import State from "@/app/interfaces/StateInterface";
import { useRouter } from "next/navigation";

type Props = {
    id_user: number,
    id_department: number,
    admin: boolean;
};

const TicketClient: React.FC<{ user: Props, ticket: Ticket }> = ({ user, ticket }: { user: Props, ticket: Ticket }) => {

    const router = useRouter()
    const authorization = user.admin || user.id_user === ticket.created_by || user.id_department === ticket.id_department;

    const [state, setState] = useState(ticket.id_state);
    const [states, setStates] = useState<State[]>([]);
    const [observations, setObservations] = useState("");
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


    const handleUpdateTicket = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!user || [2].includes(state) && !observations.trim()) {
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
                    <div className="mb-4">
                        <h2 className="text-gray-800 text-lg font-bold">{ticket.title}</h2>
                        <p className="text-sm text-gray-500">
                            Created: {new Date(ticket.created_at).toLocaleString()} by {ticket.creator.name}
                        </p>
                        {ticket.updated_at && (
                            <p className="text-sm text-gray-500">
                                Last Updated: {new Date(ticket.updated_at).toLocaleString()} by {ticket.updater.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 text-sm font-bold">Description:</p>
                        <p className="text-gray-600">{ticket.description}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm font-bold">
                            Department: <span className="font-normal">{ticket.department.title}</span>
                        </p>
                        <p className="text-gray-600 text-sm font-bold">
                            State: <span className="font-normal">{ticket.state.title}</span>
                        </p>
                    </div>
                    {ticket.observations && (
                        <div className="mb-4">
                            <p className="text-gray-700 text-sm font-bold">Observations:</p>
                            <p className="text-gray-600">{ticket.observations}</p>
                        </div>
                    )}
                    {/* Ticket Management Section */}
                    {
                        ![2, 4].includes(ticket.id_state) && (
                            <div className="mt-6">
                                <h2 className="text-gray-800 text-lg font-bold mb-4">Manage Ticket</h2>

                                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                                {/* Observations Field */}
                                <form onSubmit={handleUpdateTicket}>
                                    <textarea
                                        value={observations}
                                        onChange={(e) => setObservations(e.target.value)}
                                        placeholder="Add observations here"
                                        className="text-gray-700 mt-2 p-2 border rounded w-full"
                                    ></textarea>

                                    <div className="mb-6">
                                        {/* Buttons for State Updates */}
                                        <select
                                            id="department"
                                            value={state}
                                            onChange={(e) => setState(parseInt(e.target.value))}
                                            required
                                            className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {states.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Update Ticket
                                    </button>
                                </form>

                            </div>
                        )
                    }
                </>
            }
        </div>
    );
};

export default TicketClient;
