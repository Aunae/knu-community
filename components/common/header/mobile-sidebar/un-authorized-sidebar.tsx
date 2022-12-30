import Link from 'next/link';
import Accordion from './accordion';
import { CategoryWithChildren } from '../../../../libs/models/category';

interface Props {
  categories: CategoryWithChildren[];
  handleClose: () => void;
}

const UnAuthorizedSidebar = ({ handleClose, categories }: Props) => {
  return (
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
  );
};
export default UnAuthorizedSidebar;
