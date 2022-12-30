import PostSection from './post-section';
import { ReactNode } from 'react';
import { Session } from 'next-auth';
import PostFloatingButton from '../../components/home/post-floating-button';

interface Props {
  children: ReactNode;
  session: Session;
}

const HomePage = async () => {
  return (
    <div>
      <div>home page</div>
      {/* @ts-expect-error Server Component */}
      <PostSection />
      <PostFloatingButton />
    </div>
  );
};

export default HomePage;
