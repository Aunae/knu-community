import PostComponent from '../../components/board/post';
import { getMockPosts } from '../../libs/utils/mock-post';

const PostSection = async () => {
  const { data: posts } = await getMockPosts();

  return (
    <div>
      {posts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostSection;
