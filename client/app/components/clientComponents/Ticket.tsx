"use client";
import { useEffect, useState } from "react";
import Ticket from "../../interfaces/TicketInterface";
import { getStates, isAuthenticated, updateTicket } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import State from "@/app/interfaces/StateInterface";
import UserInterface from "@/app/interfaces/UserInterface";


const TicketClient = ({ ticket }: { ticket: Ticket }) => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface|null>(null);
    const [state, setState] = useState(ticket.id_state);
    const [states, setStates] = useState<State[]>([]);
    const [authorization, setAuthorization] = useState(false);
    const [observations, setObservations] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await isAuthenticated();
                if (response.data.authenticated) {
                    const user = response.data.user;
                    if (
                        user.admin ||
                        user.id === ticket.created_by ||
                        user.id_department === ticket.id_department
                    ) {
                        setUser(user)
                        setAuthorization(true);
                    }
                } else {
                    router.replace("/login");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await getStates();
            setStates(response.data);
        } catch (err) {
            console.error('Failed to fetch states', err);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);


    const handleUpdateTicket = async (e: React.FormEvent) => {
        e.preventDefault()
        setSuccessMessage(null);
        setErrorMessage(null);
        console.log(state)
        console.log(observations)
        if (!user || [2, 4].includes(state) && !observations.trim()) {
            setErrorMessage("Observations are required when rejecting or completing a ticket.")
            return;
        }

        try {
            const new_data = {
                id_state: state,
                id_user: user.id,
                observations: ticket.observations ? ticket.observations + "\n" + observations : observations

            }
            const response = await updateTicket(ticket.id, new_data);
            console.log(response)
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
    };


    return (
        <>
            {!authorization ? (
                <h1 className="text-red-600 text-md font-bold text-center mt-6">
                    Insufficient authorization to view ticket
                </h1>
            ) : (
                <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                    <h1 className="text-gray-900 text-2xl font-bold mb-4">
                        Ticket Details
                    </h1>
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


                </div>
            )}
        </>
    );
};

export default TicketClient;
