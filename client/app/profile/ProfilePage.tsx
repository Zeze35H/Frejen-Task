import { cookies } from 'next/headers';
import Profile from '../components/clientComponents/Profile';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString(); // Serialize cookies to pass them to the API

  try {
    const response = await fetch('http://localhost:8000/api/auth/checkAuth', {
      headers: {
        cookie: cookieHeader, // Send cookies to the backend
      },
      credentials: 'include', // Ensure credentials are included in the request
      cache: 'no-store', // Prevent caching
    });

    if (!response.ok) {
      return redirect('/login'); // Ensure redirect response is returned
    }

    const data = await response.json();

    if (!data.authenticated) {
      return redirect('/login'); // Ensure redirect response is returned
    }

    // Render the profile if authenticated
    return (
      <Profile user={data.user} />
    );
  } catch (err) {
    console.error(err);
    return redirect('/login'); // Redirect to login on error
  }
}
