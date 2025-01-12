"use client";
import Ticket from '../../interfaces/TicketInterface'
import Link from 'next/link';

const TicketClient = ({ ticket, }: { ticket: Ticket }) => {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-gray-900 text-2xl font-bold mb-4">Ticket Details</h1>
                <div className="mb-4">
                    <h2 className="text-gray-800 text-lg font-bold">{ticket.title}</h2>
                    <p className="text-sm text-gray-500">Created: {new Date(ticket.created_at).toLocaleString()}</p>
                    {ticket.updated_at && (
                        <p className="text-sm text-gray-500">Last Updated: {new Date(ticket.updated_at).toLocaleString()}</p>
                    )}
                </div>
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold">Description:</p>
                    <p className="text-gray-600">{ticket.description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-sm font-bold">Department: <span className='font-normal'>{ticket.department.title}</span></p>
                    <p className="text-gray-600 text-sm font-bold">State: <span className='font-normal'>{ticket.state.title}</span></p>
                </div>
                {ticket.observations && (
                    <div className="mb-4">
                        <p className="text-gray-700 text-sm font-bold">Observations:</p>
                        <p className="text-gray-600">{ticket.observations}</p>
                    </div>
                )}
                <div className="mb-4">
                    <p className="text-gray-600 text-sm font-bold">Created By: <span className='font-normal'>{ticket.creator.name}</span></p>
                    <p className="text-gray-600 text-sm font-bold">Updated By: <span className='font-normal'>{ticket.updater.name}</span></p>
                </div>
                <Link href="/homepage">
                    <button
                        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Go Back
                    </button>
                </Link>

            </div>
        </div>

    );
};

export default TicketClient;
