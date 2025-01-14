"use client"
import React, { useState, useEffect } from 'react';
import { findAllTickets, getStates } from '../../utils/api'

import Link from 'next/link';
import Nav from './Nav';

import Ticket from '../../interfaces/TicketInterface'
import State from '../../interfaces/StateInterface'

type Props = {
  id_user: number,
  id_department: number,
  admin: boolean;
};

const TicketList: React.FC<Props> = ({ id_user, id_department, admin }: Props) => {

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTickets, setNewTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState({ text: '', states: [] as number[] });
  const [stateFilters, setStateFilters] = useState<State[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pagination_limit = 4

  const fetchTickets = async () => {
    setLoading(true);

    const data = {
      id_user: id_user,
      id_department: id_department,
      admin: admin,
      text: filters.text,
      states: filters.states,
      page: page,
      limit: pagination_limit,
    }

    console.log(data)
    try {
      const ticketResponse = await findAllTickets(data);
      setNewTickets(ticketResponse.data)
      if (page === 1) {
        console.log(ticketResponse.data)

        setTickets(ticketResponse.data); // Reset tickets on page 1
      } else {
        const seen = new Set(tickets.map((ticket) => ticket.id));
        console.log([...tickets, ...ticketResponse.data.filter((ticket: Ticket) => !seen.has(ticket.id))])
        setTickets([...tickets, ...ticketResponse.data.filter((ticket: Ticket) => !seen.has(ticket.id))])
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  const fetchStateFilters = async () => {
    try {
      const response = await getStates();
      setStateFilters(response.data);
    } catch (err) {
      console.error('Failed to fetch states', err);
    }
  };

  useEffect(() => {
    console.log("effect!!")
    fetchStateFilters();
  }, []);

  useEffect(() => {
    setTickets([]); // Reset tickets when filters change
    setPage(1); // Reset pagination
    fetchTickets();
  }, [filters]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchTickets();
    }
  }, [page]);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Ticket List</h1>
          <div className="text-gray-600 mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              value={filters.text}
              onChange={(e) => {
                setFilters({ ...filters, text: e.target.value })
                setPage(1)
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
            <div className="text-gray-600 flex flex-wrap gap-2">
              {stateFilters.map((state) => (
                <label key={state.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.states.includes(state.id)}
                    onChange={(e) => {
                      const newStates = e.target.checked
                        ? [...filters.states, state.id]
                        : filters.states.filter((id) => id !== state.id);
                      setFilters({ ...filters, states: newStates });
                      setPage(1);
                    }}
                  />
                  <span>{state.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            {tickets.map((ticket) => (
              <Link href={`ticket/${ticket.id}`} key={ticket.id}>
                <div className="p-4 mb-4 border rounded hover:shadow-md">
                  <h2 className="text-lg font-bold text-gray-600">{ticket.title}</h2>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(ticket.created_at).toLocaleDateString()} | Updated: {new Date(ticket.updated_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-bold text-gray-500">Department: <span className='font-normal'>{ticket.department.title}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-500">State: <span className='font-normal'>{ticket.state.title}</span>
                  </p>
                </div>
              </Link>

            ))}
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {!loading && tickets.length > 0 && (
              <button
                onClick={handleLoadMore}
                disabled={loading || newTickets.length < pagination_limit}
                className={`mt-4 w-full font-bold py-2 px-4 rounded focus:outline-none ${loading || newTickets.length < pagination_limit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  }`}
              >
                Load More
              </button>
            )}
          </div>
          {tickets.length === 0 && !loading && <p className="text-center text-gray-500">No tickets found.</p>}
        </div>
      </div>
    </>

  );
};

export default TicketList;
