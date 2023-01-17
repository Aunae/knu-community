'use client';
import { useState } from 'react';
import { CategoryWithChildren } from '../../../libs/models/category';
import { MdMenu as MenuIcon, MdSearch as SearchIcon } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import styles from './header.module.css';

interface Props {
  categories: CategoryWithChildren[];
}

const Header = ({ categories }: Props) => {
  const { data: session, status } = useSession();

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const handleDrawerOpen = () => setOpenMobileSidebar(true);
  const handleDrawerClose = () => setOpenMobileSidebar(false);

  if (status === 'loading') {
    return <p>로딩중...</p>;
  }

  // 세션에 유저 정보 없음
  // if (status === 'unauthenticated') {
  //   return <div>un auth</div>;
  // }

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

      <MobileSidebar session={session!} open={openMobileSidebar} categories={categories} handleClose={handleDrawerClose} />
    </>
  );
};

export default Header;
