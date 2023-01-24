import { ReactNode, Suspense } from 'react';
import HeaderWrapper from '../../../components/common/header/header-wrapper';

interface Props {
  children: ReactNode;
}

const BoardLayout = ({ children }: Props) => {
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

export default BoardLayout;
