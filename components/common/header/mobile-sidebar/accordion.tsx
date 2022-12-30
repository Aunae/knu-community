import Link from 'next/link';
import { useState } from 'react';
import { CategoryWithChildren } from '../../../../libs/models/category';
import { MdArrowDropDown as DownIcon, MdArrowDropUp as UpIcon } from 'react-icons/md';

interface Props {
  category: CategoryWithChildren;
}

const Accordion = ({ category }: Props) => {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const handleOpenAccordion = () => setOpenSubCategory(!openSubCategory);

  return (
    <section className={`${openSubCategory ? 'mb-5' : ''}`}>
      {/*Header*/}
      <button onClick={handleOpenAccordion} className="grid grid-cols-1 relative w-full px-4 py-2 font-bold border rounded hover:bg-blue-300">
        <div className="flex justify-between">
          <h3 className="text-base text-black font-medium">{category.name}</h3>
          {openSubCategory ? <UpIcon size={20} /> : <DownIcon size={20} />}
        </div>
      </button>

      {/*Content*/}
      <div className={`${!openSubCategory && 'hidden'} grid grid-cols-2`}>
        {category.children?.map((subCategory) => (
          <Link href={`/board/${category.id}`} key={subCategory.id} className="block px-4 py-2 text-white font-bold border rounded hover:bg-blue-300">
            <h4 className="text-sm text-black font-normal">{subCategory.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
