import './globals.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import Providers from './providers';
import { getSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  const session = await getSession();

  return (
    <html lang="en">
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
