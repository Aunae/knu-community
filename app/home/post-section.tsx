import PostSectionMain from '../../components/post/post-section-main';
import styles from './post-section.module.scss';

const PostSection = async ({ ...props }) => {
  return (
    <>
      <h1 className={styles.title}>최신 글</h1>
      <PostSectionMain {...props} />
    </>
  );
};

export default PostSection;
