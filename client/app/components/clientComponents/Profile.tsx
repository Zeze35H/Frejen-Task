"use client"
import React, { useState, useEffect } from 'react';
import { getDepartments, updateUser } from '../../utils/api'
import DepartmentInterface from '../../interfaces/DepartmentInterface'
import Nav from '../../components/clientComponents/Nav';

type Props = {
    id_user: number,
    user_name: string;
    id_department: number,
  };

const Profile: React.FC<Props> = ({id_user, user_name, id_department}:Props) => {

    const [name, setName] = useState(user_name || '');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState(id_department || '');
    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchDepartments = async () => {
        setLoading(true)
        try {
            const response = await getDepartments();
            setDepartments(response.data);
        } catch {
            setErrorMessage('Failed to load departments.');
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            await updateUser(id_user, { name, password, department });
            setSuccessMessage('Profile updated successfully.');
        } catch (err) {
            console.error(err)
            setErrorMessage('Failed to update profile.');
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
                    <h2 className="text-gray-800 text-2xl font-bold mb-6">Profile</h2>
                    {loading && <p className=" text-gray-500 text-center mb-4">Loading...</p>}
                    {!loading &&
                        <>
                            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="text-gray-700 mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    Update Profile
                                </button>
                            </form>
                        </>
                    }
                </div>
            </div>
        </>

    );
};

export default Profile;
