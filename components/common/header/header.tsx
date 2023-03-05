'use client';
import { useState } from 'react';
import { CategoryWithChildren } from '../../../libs/models/category';
import { MdMenu as MenuIcon, MdSearch as SearchIcon } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import styles from './header.module.scss';
import Link from 'next/link';
import useInput from '../../hooks/useInput';

interface Props {
  categories: CategoryWithChildren[];
  // session: Session | null;
  // status: 'authenticated' | 'loading' | 'unauthenticated';
}

const Header = ({ categories }: Props) => {
  const { data: session } = useSession();

  const searchQuery = useInput();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <div>
            <Link href="/" className={styles.logo}>
              KNU
            </Link>
          </div>
          <div className={styles.nav}>
            <Link href="/">홈</Link>
            <Link href="/">동아리</Link>
            <Link href="/">코딩게시판</Link>
            <Link href="/">공지사항</Link>
          </div>
        </div>
        <div className={styles.header_right}>
          <form>
            <input placeholder="검색어를 입력하세요." type="text" {...searchQuery} />
            <div className={styles.search_icon}>
              <SearchIcon />
            </div>
          </form>
          <div className={styles.profile_container}>
            <Link href="/profile" className={styles.profile}></Link>
            <div className={styles.profile_name}>{session?.user?.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
