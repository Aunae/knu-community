import './globals.css';
import HeaderWrapper from '../components/common/header/header-wrapper';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        {/* @ts-expect-error Server Component */}
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
