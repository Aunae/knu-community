import { ReactNode, Suspense } from 'react';
import HeaderWrapper from '../../components/common/header/header-wrapper';

interface Props {
  children: ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <HeaderWrapper />
      </Suspense>
      {children}
    </>
  );
};

export default HomeLayout;
