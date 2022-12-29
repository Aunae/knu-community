import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <>{children}</>;
};
export default AuthLayout;
