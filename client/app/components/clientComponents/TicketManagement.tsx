"use client"
import React, { useState } from "react";

import State from '../../interfaces/StateInterface'

type Props = {
    ticket_state: number,
    successMessage: string | null,
    errorMessage: string | null,
    handleUpdateTicket: (e: React.FormEvent, state:number, observations:string) => void,
    states: State[],
}

const TicketManagement: React.FC<Props> = ({ ticket_state, successMessage, errorMessage, handleUpdateTicket, states }) => {

    const [state, setState] = useState(ticket_state);
    const [observations, setObservations] = useState("");

    return (
        <div className="mt-6">
            <h2 className="text-gray-800 text-lg font-bold mb-4">Manage Ticket</h2>

            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            {/* Observations Field */}
            <form onSubmit={(e) => handleUpdateTicket(e, state, observations)}>
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
    );
};

export default TicketManagement;
