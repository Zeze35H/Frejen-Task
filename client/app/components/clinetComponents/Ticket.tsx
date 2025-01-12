"use client";
import { useRouter } from 'next/navigation';

type TicketDetail = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string | null;
    department: string;
    state: string;
    observations?: string;
};

const Ticket = ({ ticket, }: { ticket: TicketDetail }) => {

    const router = useRouter()

    // if (loading) {
    //     return <p className="text-center mt-6">Loading ticket details...</p>;
    // }

    // if (error) {
    //     return <p className="text-center mt-6 text-red-500">{error}</p>;
    // }

    // if (!ticket) {
    //     return <p className="text-center mt-6">No ticket found.</p>;
    // }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>
                <div className="mb-4">
                    <h2 className="text-lg font-bold">{ticket.title}</h2>
                    <p className="text-sm text-gray-500">Created: {new Date(ticket.created_at).toLocaleString()}</p>
                    {ticket.updated_at && (
                        <p className="text-sm text-gray-500">Last Updated: {new Date(ticket.updated_at).toLocaleString()}</p>
                    )}
                </div>
                <div className="mb-4">
                    <p className="text-sm">
                        <strong>Description:</strong>
                    </p>
                    <p className="text-gray-700">{ticket.description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm">
                        <strong>Department:</strong> {ticket.department}
                    </p>
                    <p className="text-sm">
                        <strong>State:</strong> {ticket.state}
                    </p>
                </div>
                {ticket.observations && (
                    <div className="mb-4">
                        <p className="text-sm">
                            <strong>Observations:</strong>
                        </p>
                        <p className="text-gray-700">{ticket.observations}</p>
                    </div>
                )}
                <div className="mb-4">
                    <p className="text-sm">
                        <strong>Created By:</strong> {ticket.created_by}
                    </p>
                    {ticket.updated_by && (
                        <p className="text-sm">
                            <strong>Updated By:</strong> {ticket.updated_by}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => router.back()}
                    className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Go Back
                </button>
            </div>
        </div>

    );
};

export default Ticket;
