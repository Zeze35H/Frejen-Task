import checkAuth from './../utils/checkAuth.js'
import UserInterface from './../interfaces/UserInterface'

import TicketList from '../components/clientComponents/TicketList';

export default async function HomePage() {

  const user: UserInterface = await checkAuth();

  return (
    <TicketList id_user={user.id} id_department={user.id_department} admin={user.admin} />
  );
}
