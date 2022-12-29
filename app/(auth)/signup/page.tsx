import { ReactNode } from 'react';
import SignupForm from '../../../components/auth/signup-form';

interface Props {
  children: ReactNode;
}

const SignupPage = ({ children }: Props) => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <SignupForm />
    </main>
  );
};

export default SignupPage;
