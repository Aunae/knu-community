import Link from 'next/link';
import Accordion from './accordion';
import { CategoryWithChildren } from '../../../../libs/models/category';
import { signOut } from 'next-auth/react';

interface Props {
  categories: CategoryWithChildren[];
  handleClose: () => void;
}

const AuthorizedSidebar = ({ handleClose, categories }: Props) => {
  return (
    <nav>
      <div className="grid grid-cols-2 gap-2 justify-center text-center">
        <Link href="/profile" onClick={handleClose} className="border-2 text-gray-800 hover:text-blue-300">
          마이페이지
        </Link>
        <Link
          href="/home"
          onClick={() => {
            handleClose();
            signOut();
          }}
          className="border-2 text-gray-800 hover:text-blue-300"
        >
          로그아웃
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
export default AuthorizedSidebar;
