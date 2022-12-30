'use client';
import { useState } from 'react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import { CategoryWithChildren } from '../../../libs/models/category';
import { useSession } from 'next-auth/react';
import { MdMenu, MdSearch } from 'react-icons/md';

/** Todo: replace to icon */
const MenuIcon = 'https://img.icons8.com/ios-glyphs/30/null/menu-rounded.png';
// const SearchIcon = 'https://img.icons8.com/ios/50/null/search--v1.png';

interface Props {
  categories: CategoryWithChildren[];
}

const Header = ({ categories }: Props) => {
  const { data: session, status } = useSession();

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const handleDrawerOpen = () => setOpenMobileSidebar(true);
  const handleDrawerClose = () => setOpenMobileSidebar(false);

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'unauthenticated') {
    return <div>un auth</div>;
  }

  console.log(`auth user: `, session?.user);

  return (
    <>
      <div className="flex static justify-between items-center bg-blue-400 rounded-b-sm shadow-sm">
        <button onClick={handleDrawerOpen}>
          <MdMenu size={50} />
        </button>
        {/*<Image onClick={handleDrawerOpen} src={MenuIcon} width={50} height={50} alt={'menu'} />*/}
        <h1 className="text-4xl font-extrabold tracking-tight text-white">KNU</h1>
        <button>
          <MdSearch size={50} />
        </button>
        {/*<Image src={MdSearch} width={50} height={50} alt={'search'} />*/}
      </div>

      <MobileSidebar session={session!} open={openMobileSidebar} categories={categories} handleClose={handleDrawerClose} />
    </>
  );
};

export default Header;
