import checkAuth from './../utils/checkAuth.js'
import UserInterface from './../interfaces/UserInterface'

import TicketForm from '../components/clientComponents/TicketForm';

export default async function HomePage() {

  const user: UserInterface = await checkAuth();
  console.log(user)

  return (
    <TicketForm id_user={user.id} />
  );
}
