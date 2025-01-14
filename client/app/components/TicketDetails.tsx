import React from "react";

import Ticket from '../interfaces/TicketInterface'

const TicketDetails: React.FC<Ticket> = (ticket) => {


    return (
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
        </>
    );
};

export default TicketDetails;
