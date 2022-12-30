import './globals.css';
import { ReactNode } from 'react';
import { unstable_getServerSession } from 'next-auth';
import Providers from './providers';

interface Props {
  children: ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  const session = await unstable_getServerSession();

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
