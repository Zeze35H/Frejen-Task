import React from "react";
import Link from "next/link";

import Ticket from '../interfaces/TicketInterface'

const TicketCard: React.FC<Ticket> = (ticket) => {


    return (
        <Link href={`ticket/${ticket.id}`}>
            <div className="p-4 mb-4 border rounded hover:shadow-md">
                <h2 className="text-lg font-bold text-gray-600">{ticket.title}</h2>
                <p className="text-sm text-gray-400">
                    Created: {new Date(ticket.created_at).toLocaleDateString()} | Updated: {new Date(ticket.updated_at).toLocaleDateString()}
                </p>
                <p className="text-sm font-bold text-gray-500">Department: <span className='font-normal'>{ticket.department.title}</span></p>
                <p className="text-sm font-bold text-gray-500">State: <span className='font-normal'>{ticket.state.title}</span></p>
            </div>
        </Link>
    );
};

export default TicketCard;
