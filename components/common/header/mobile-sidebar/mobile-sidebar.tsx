import { Category } from '../header';
import Accordion from './accordion';

interface Props {
  // children: ReactNode;
  categories: Category[];
  open: Boolean;
  handleClose: () => void;
}

const MobileSidebar = ({ open, handleClose, categories }: Props) => {
  return (
    open && (
      <main>
        <section className="grid bg-gray-100 w-64 h-screen fixed left-0 top-0 z-20 ">
          <nav>
            <ul className="px-4 py-4">
              {categories.map((category) => (
                <Accordion key={category.id} category={category} />
              ))}
            </ul>
          </nav>
        </section>

        {/*클릭시 모달 닫히는 영역*/}
        <section className={'h-screen bg-gray-300'} onClick={handleClose} />
      </main>
    )
  );
};

export default MobileSidebar;
