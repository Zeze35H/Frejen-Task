import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function checkAuth(from_login = false) {

    let redirect_path = null
    let user_data = null

    try {

        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString(); // Serialize cookies to pass them to the API

        const response = await fetch('http://localhost:8000/api/auth/checkAuth', {
            headers: {
                cookie: cookieHeader, // Send cookies to the backend
            },
            credentials: 'include', // Ensure credentials are included in the request
            cache: 'no-store', // Prevent caching
        });

        if (!response.ok) {
            redirect_path = '/error'; // Ensure redirect response is returned
            return null;
        }

        const data = await response.json();

        if (!data.authenticated) {
            if (!from_login)
                redirect_path = '/login'; // Redirects authenticated user to loginpage
            // Allow unauthenticated user to access login page
            return null;
        }

        // Redirect to hommepage if user is authenticated and tries to access login
        if(from_login) {
            redirect_path = '/homepage'
            return null
        }

        // Return user if authenticated
        user_data = data.user;
    } catch (err) {
        console.error(err);
        redirect_path = '/error'
    }
    finally {
        if(redirect_path)
            return redirect(redirect_path)
        return user_data;
    }
}
