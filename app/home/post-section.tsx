import PostComponent from '../../components/post/post-item';
import PostSectionMain from '../../components/post/post-section-main';
import { postService } from '../../libs/services/post/post.service';
import { getMockPosts } from '../../libs/utils/mock-post';

const PostSection = async ({ ...props }) => {
  // TODO: props의 searchParams로 paginated된 page의 목록 가져오기
  // const { data: posts } = await getMockPosts();
  const page = Number.isNaN(+props.searchParams.page) ? 0 : +props.searchParams.page - 1;
  const take = 20;
  const { data: posts } = await postService.getPosts(page * take, take);

  return (
    <>
      <h1>최신 글</h1>
      <PostSectionMain posts={posts} {...props} />
    </>
  );
};

export default PostSection;
