import { ReactNode } from 'react';
import CommentFloatingButton from '../../../components/board/comment-floating-button';
import { MdAccountCircle as MockIcon, MdComment as CommentIcon, MdMoreVert as CommentOptionIcon, MdThumbUp as LikeIcon } from 'react-icons/md';

interface Props {
  children: ReactNode;
  params: { id: string };
}

const getMockBoard = async (id: string) => {
  const post: any = {
    id: '1234-1234-1234-1234',
    title: '자게글1 제목',
    content:
      'Mock description Mock description \nMock description Mock description Mock description \n Mock description Mock description \n Mock description Mock description Mock description \n Mock description Mock description Mock description Mock description Mock description Mock description Mock description Mock description Mock description Mock description ',
    author: { email: 'mock@email.com', id: 'mock-user-id', name: 'jeee' },
    authorId: 'mock-user-id',
    category: { id: 'mock-category-id', name: '자유 게시판', parentId: null },
    categoryId: 'mock-category-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return post;
};

const BoardPage = async ({ params, children }: Props) => {
  const post = await getMockBoard(params.id);

  return (
    <main>
      <article className="grid grid-rows-[150px,_3fr,_1fr] h-screen px-5">
        {/*게시글 헤더*/}
        <section className="flex flex-col border-b justify-center bg-amber-200">
          <div className="flex items-center">
            <h3 className="text-xl mr-2">{post.category.name}</h3>
            <h2 className="text-5xl ml-2">{post.title}</h2>
          </div>
        </section>

        {/*게시글 본문*/}
        <section className="bg-gray-200 mb-10">
          <p className="text-base">{post.content}</p>
        </section>

        {/*댓글창*/}
        <section className="flex w-screen bg-red-200">
          <MockIcon size={50} />
          <div className="flex flex-col w-full">
            <div className="flex justify-between bg-red-100">
              {/*사용자 정보 영역*/}
              <div className="flex bg-blue-100">
                <p>user nickname</p>
                <p>2시간전</p>
                <LikeIcon />
                <p>{77}</p>
              </div>
              {/*댓글, 추천, 옵션 버튼 영역*/}
              <div className="flex bg-yellow-50">
                <button>
                  <CommentIcon size={15} />
                </button>
                <button>
                  <LikeIcon size={15} />
                </button>
                <button>
                  <CommentOptionIcon size={15} />
                </button>
              </div>
            </div>
            <div className="bg-gray-400">
              <p>comment section</p>
            </div>
          </div>
        </section>

        <CommentFloatingButton />
      </article>
    </main>
  );
};

export default BoardPage;
