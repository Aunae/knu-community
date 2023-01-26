'use client';
import { useState } from 'react';
import { CategoryWithChildren } from '../../../libs/models/category';
import { MdMenu as MenuIcon, MdSearch as SearchIcon } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import styles from './header.module.css';
import Link from 'next/link';

interface Props {
  categories: CategoryWithChildren[];
  // session: Session | null;
  // status: 'authenticated' | 'loading' | 'unauthenticated';
}

const Header = ({ categories }: Props) => {
  const { data: session } = useSession();

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const handleDrawerOpen = () => setOpenMobileSidebar(true);
  const handleDrawerClose = () => setOpenMobileSidebar(false);

  return (
    <>
      <div className={styles.header}>
        <button className="text-white" onClick={handleDrawerOpen}>
          <MenuIcon size={25} />
        </button>
        <Link href="/" className={styles.logo}>
          KNU
        </Link>
        <button className="text-white">
          <SearchIcon size={25} />
        </button>
      </div>

      <MobileSidebar session={session} open={openMobileSidebar} categories={categories} handleClose={handleDrawerClose} />
    </>
  );
};

export default Header;
