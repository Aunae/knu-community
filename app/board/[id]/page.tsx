import { ReactNode } from 'react';
import CommentFloatingButton from '../../../components/board/comment-floating-button';

interface Props {
  children: ReactNode;
  params: { id: string };
}

const getBoard = async () => {
  return <></>;
};

const BoardPage = async ({ params, children }: Props) => {
  const board = await getBoard();

  return (
    <main>
      <article className="grid grid-rows-[150px,_3fr,_1fr] h-screen px-5">
        <section className="flex text-center items-center justify-center border-b bg-amber-200">
          <h2 className="text-5xl">board title section</h2>
        </section>
        <section className="bg-gray-200 mb-10">
          <p>board content section</p>
        </section>
        <section className="bg-red-200">
          <p>comment section</p>
        </section>

        <CommentFloatingButton />
      </article>
    </main>
  );
};

export default BoardPage;
