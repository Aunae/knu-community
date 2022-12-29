import LoginForm from '../../../components/auth/login-form';

interface Props {}

const LoginPage = ({}: Props) => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
