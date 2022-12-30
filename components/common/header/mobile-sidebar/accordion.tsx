import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { CategoryWithChildren } from '../../../../libs/models/category';

/** Todo: Replace to Icon */
const DownIcon = 'https://img.icons8.com/ios-glyphs/30/null/long-arrow-down.png';
const UpIcon = 'https://img.icons8.com/ios-glyphs/30/null/long-arrow-up.png';

interface Props {
  category: CategoryWithChildren;
}

const Accordion = ({ category }: Props) => {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const handleOpenAccordion = () => setOpenSubCategory(!openSubCategory);

  return (
    <>
      {/*Header*/}
      <button onClick={handleOpenAccordion} className="grid grid-cols-1 relative w-full px-4 py-2 text-white font-bold rounded hover:bg-gray-700">
        <div className="flex justify-between">
          <p className="text-black">{category.name}</p>

          {/*Todo: replace icon*/}
          <Image src={openSubCategory ? UpIcon : DownIcon} width={15} height={15} alt={'menu'} />
        </div>
      </button>

      {/*Content*/}
      <div className={`${!openSubCategory && 'hidden'} grid grid-cols-2`}>
        {category.children?.map((subCategory) => (
          <Link href={category.id} key={subCategory.id} className="block px-4 py-2 text-white font-bold rounded hover:bg-gray-700">
            <p className="text-black">{subCategory.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Accordion;
