'use client';
import { useState } from 'react';
import MobileSidebar from './mobile-sidebar/mobile-sidebar';
import Image from 'next/image';

/** Todo: replace to icon */
const MenuIcon = 'https://img.icons8.com/ios-glyphs/30/null/menu-rounded.png';
const SearchIcon = 'https://img.icons8.com/ios/50/null/search--v1.png';
export interface Category {
  id: string;
  name: string;
  subCategories?: Category[];
}

interface Props {}

export default function Header({}: Props) {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const handleDrawerOpen = () => setOpenMobileSidebar(true);
  const handleDrawerClose = () => setOpenMobileSidebar(false);

  return (
    <>
      <div className={'flex static justify-between items-center bg-blue-400'}>
        <Image onClick={handleDrawerOpen} src={MenuIcon} width={50} height={50} alt={'menu'} />
        <p>KNU</p>
        <Image src={SearchIcon} width={50} height={50} alt={'search'} />
      </div>

      <MobileSidebar open={openMobileSidebar} categories={mockCategories} handleClose={handleDrawerClose} />
    </>
  );
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: '자유게시판',
    subCategories: [
      { id: '5', name: '자치1' },
      { id: '6', name: '자치2' },
    ],
  },
  {
    id: '2',
    name: '유머게시판',
    subCategories: [
      { id: '5', name: '자치1' },
      { id: '6', name: '자치2' },
    ],
  },
  {
    id: '3',
    name: '자치구역',
    subCategories: [
      { id: '5', name: '자치1' },
      { id: '6', name: '자치2' },
    ],
  },
  {
    id: '4',
    name: '코드리뷰',
    subCategories: [
      { id: '5', name: '자치1' },
      { id: '6', name: '자치2' },
    ],
  },
];
