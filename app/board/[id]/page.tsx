import PostSection from './post-section';
import PostFloatingButton from '../../components/home/post-floating-button';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

interface Props {
  children: ReactNode;
  session: Session;
}

const BoardPage = () => {
  return (
    <div>
      <div>home page</div>
      {/* @ts-expect-error Server Component */}
      <PostFloatingButton />
    </div>
  );
};

export default BoardPage;
