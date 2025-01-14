"use client"
import React, { useState, useEffect } from 'react';
import { getDepartments, createTicket } from "../../utils/api"
import DepartmentInterface from '../../interfaces/DepartmentInterface';
import Nav from '../../components/clientComponents/Nav';

type Props = {
    id_user: number,
};

const TicketForm: React.FC<Props> = ({ id_user}: Props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const response = await getDepartments();
                setDepartments(response.data);
            } catch (err) {
                console.error(err)
                setErrorMessage('Failed to load departments.');
            }
            finally {
                setLoading(false)
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!title || !description || !department) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            console.log({ id_user, title, description, department })
            const response = await createTicket({ id_user, title, description, department });
            console.log(response)
            setSuccessMessage('Ticket created successfully.');
            setTitle('');
            setDescription('');
            setDepartment('');
        } catch (err) {
            console.error(err)
            setErrorMessage('Failed to create ticket.');
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg bg-white p-8 rounded shadow">

                    <h2 className="text-gray-800 text-2xl font-bold mb-6">Create Ticket</h2>
                    {loading && <p className=" text-gray-500 text-center mb-4">Loading...</p>}
                    {!loading &&
                        <>
                            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                        className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select a department
                                        </option>
                                        {departments.map((dep) => (
                                            <option key={dep.id} value={dep.id}>
                                                {dep.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Create Ticket
                                </button>
                            </form>
                        </>
                    }

                </div>
            </div>
        </>

    );
};

export default TicketForm;
