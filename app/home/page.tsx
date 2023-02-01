import PostSection from './post-section';
import { ReactNode, Suspense } from 'react';
import { Session } from 'next-auth';
import PostFloatingButton from '../../components/home/post-floating-button';
import styles from './post-page.module.scss';

interface Props {
  params?: {};
}

const HomePage = async (props: Props) => {
  return (
    <Suspense>
      <div className={styles.page}>
        {/* @ts-expect-error Server Component */}
        <PostSection {...props} />
        <PostFloatingButton />
      </div>
    </Suspense>
  );
};

export default HomePage;
