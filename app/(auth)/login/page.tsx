import LoginForm from '../../../components/auth/login-form';
import { getProviders } from 'next-auth/react';

interface Props {}

const LoginPage = async ({}: Props) => {
  const providers = await getProviders();

  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <LoginForm providers={providers} />
    </main>
  );
};

export default LoginPage;
