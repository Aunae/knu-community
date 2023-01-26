import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const NewPostLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default NewPostLayout;
