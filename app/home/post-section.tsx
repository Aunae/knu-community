import { getMockPosts } from '../../libs/utils/mock-post';

const PostSection = async () => {
  const { data: posts } = await getMockPosts();

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.author.name}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
};

export default PostSection;
