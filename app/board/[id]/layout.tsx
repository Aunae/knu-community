import { ReactNode } from 'react';
import HeaderWrapper from '../../components/common/header/header-wrapper';

interface Props {
  children: ReactNode;
}

const BoardLayout = ({ children }: Props) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HeaderWrapper />
      {children}
    </>
  );
};

export default BoardLayout;
