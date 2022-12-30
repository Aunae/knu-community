'use client';
import { useState } from 'react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import { CategoryWithChildren } from '../../../libs/models/category';
import { useSession } from 'next-auth/react';
import { MdMenu as MenuIcon, MdSearch as SearchIcon } from 'react-icons/md';

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
          <MenuIcon size={50} />
        </button>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">KNU</h1>
        <button>
          <SearchIcon size={50} />
        </button>
      </div>

      <MobileSidebar session={session!} open={openMobileSidebar} categories={categories} handleClose={handleDrawerClose} />
    </>
  );
};

export default Header;
