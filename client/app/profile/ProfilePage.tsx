import checkAuth from '../utils/checkAuth.js'
import UserInterface from '../interfaces/UserInterface'

import Profile from '../components/clientComponents/Profile';

export default async function ProfilePage() {

    const user:UserInterface = await checkAuth();

    return (
      <Profile id_user={user.id} user_name={user.name} id_department={user.id_department} />
    );
}
