import Accordion from './accordion';
import { CategoryWithChildren } from '../../../../libs/models/category';
import Link from 'next/link';

interface Props {
  categories: CategoryWithChildren[];
  open: Boolean;
  handleClose: () => void;
}

const MobileSidebar = ({ open, handleClose, categories }: Props) => {
  return (
    open && (
      <aside>
        <section className="grid bg-gray-100 w-64 h-screen fixed left-0 top-0 z-20">
          <nav>
            <div className="grid grid-cols-2 gap-2 justify-center text-center">
              <Link href="/signup" onClick={handleClose} className="bg-red-400">
                회원가입
              </Link>
              <Link href="/login" onClick={handleClose} className="bg-amber-200">
                로그인
              </Link>
            </div>

            {/*카테고리 목록*/}
            <ul className="py-4">
              {categories.map((category) => (
                <Accordion key={category.id} category={category} />
              ))}
            </ul>
          </nav>
        </section>

        {/*클릭시 모달 닫히는 영역*/}
        <section className={'h-screen bg-gray-300'} onClick={handleClose} />
      </aside>
    )
  );
};

export default MobileSidebar;
