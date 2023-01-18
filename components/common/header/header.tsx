'use client';
import { useEffect, useState } from 'react';
import { CategoryWithChildren } from '../../../libs/models/category';
import { MdMenu as MenuIcon, MdSearch as SearchIcon } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import styles from './header.module.css';
import { Session } from 'next-auth';

interface Props {
  categories: CategoryWithChildren[];
  // session: Session | null;
  // status: 'authenticated' | 'loading' | 'unauthenticated';
}

const Header = ({ categories }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const handleDrawerOpen = () => setOpenMobileSidebar(true);
  const handleDrawerClose = () => setOpenMobileSidebar(false);

  if (!mounted) return null;
  if (status === 'loading') {
    return <p>로딩중...</p>;
  }

  return (
    <>
      <div className={styles.header}>
        <button className="text-white" onClick={handleDrawerOpen}>
          <MenuIcon size={25} />
        </button>
        <h1 className={styles.logo}>KNU</h1>
        <button className="text-white">
          <SearchIcon size={25} />
        </button>
      </div>

      <MobileSidebar session={session} open={openMobileSidebar} categories={categories} handleClose={handleDrawerClose} />
    </>
  );
};

export default Header;
