import checkAuth from './../utils/checkAuth.js'

import LoginForm from '../components/clientComponents/LoginForm';

export default async function LoginPage() {

  await checkAuth(true);

  return (
    <LoginForm />
  );
}
