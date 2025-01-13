"use client"
import React, { useState, useEffect } from 'react';
import { getDepartments, createTicket, isAuthenticated } from "../utils/api"
import DepartmentInterface from '../interfaces/DepartmentInterface';
import { useRouter } from 'next/navigation';
import Nav from '../components/clientComponents/Nav';

const TicketCreationPage: React.FC = () => {
    const router = useRouter()

    const [id, setId] = useState(null)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const response = await isAuthenticated();
                console.log(response.data)
                if (response.data.authenticated) {
                    setId(response.data.user.id);
                    try {
                        const response = await getDepartments();
                        setDepartments(response.data);
                    } catch (err) {
                        console.error(err)
                        setErrorMessage('Failed to load departments.');
                    }
                }
                else {
                    router.replace("/login")
                }

            } catch (err) {
                console.error(err)
                setErrorMessage('Failed to load profile information.');
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!title || !description || !department) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            console.log({ title, description, department })
            const response = await createTicket({ id, title, description, department });
            console.log(response)
            setSuccessMessage('Ticket created successfully.');
            setTitle('');
            setDescription('');
            setDepartment('');
        } catch (err) {
            console.error(err)
            setErrorMessage('Failed to create ticket.');
        }
    };

    return (
        <>
            <Nav/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg bg-white p-8 rounded shadow">
                    <h2 className="text-gray-800 text-2xl font-bold mb-6">Create Ticket</h2>
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
                </div>
            </div>
        </>

    );
};

export default TicketCreationPage;
