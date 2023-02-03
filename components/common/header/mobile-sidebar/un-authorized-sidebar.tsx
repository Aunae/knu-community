import Link from 'next/link';
import Accordion from './accordion';
import { CategoryWithChildren } from '../../../../libs/models/category';
import CategoryList from './category-list';

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
      <CategoryList categories={categories} />
    </nav>
  );
};
export default UnAuthorizedSidebar;
