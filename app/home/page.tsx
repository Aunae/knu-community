import PostSection from './post-section';

const HomePage = async () => {
  return (
    <div>
      <div>home page</div>
      {/* @ts-expect-error Server Component */}
      <PostSection />
    </div>
  );
};

export default HomePage;
