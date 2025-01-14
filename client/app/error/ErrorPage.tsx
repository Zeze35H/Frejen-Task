import Link from 'next/link';
import React from 'react';

interface ErrorPageProps {
    status?: number;
    message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ status=500, message="Some error occurred" }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-700">
            <h1 className="text-4xl font-bold text-gray-100">Error {status}</h1>
            <p className="mt-2 text-lg text-gray-200">{message}</p>
            <Link
                href="/"
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-900 rounded hover:bg-gray-200"
            >
                Go Back to Homepage
            </Link>
        </div>
    );
};

export default ErrorPage;
