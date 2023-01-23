import PostSection from './post-section';
import { ReactNode, Suspense } from 'react';
import { Session } from 'next-auth';
import PostFloatingButton from '../../components/home/post-floating-button';
import styles from './post-page.module.scss';

interface Props {
  children: ReactNode;
  session: Session;
}

const HomePage = async () => {
  return (
    <Suspense>
      <div className={styles.page}>
        <div>home page</div>
        {/* @ts-expect-error Server Component */}
        <PostSection />
        <PostFloatingButton />
      </div>
    </Suspense>
  );
};

export default HomePage;
