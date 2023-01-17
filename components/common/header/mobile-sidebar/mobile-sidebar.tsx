import { CategoryWithChildren } from '../../../../libs/models/category';
import AuthorizedSidebar from './authorized-sidebar';
import UnAuthorizedSidebar from './un-authorized-sidebar';
import { Session } from 'next-auth';
import styles from './mobile-sidebar.module.css';

interface Props {
  categories: CategoryWithChildren[];
  open: Boolean;
  handleClose: () => void;
  session: Session;
}

const MobileSidebar = ({ session, open, handleClose, categories }: Props) => {
  return (
    <aside className={`${open ? styles.sectionContainer : ''}`}>
      <section className={`${styles.sidebarContainer} ${open ? styles.sidebarContainerOpen : ''}`}>
        {session ? (
          <AuthorizedSidebar categories={categories} handleClose={handleClose} />
        ) : (
          <UnAuthorizedSidebar categories={categories} handleClose={handleClose} />
        )}
      </section>

      {/*클릭시 모달 닫히는 영역*/}
      <section className={`${open ? styles.sectionClose : styles.displayNone}`} onClick={handleClose} />
    </aside>
  );
};

export default MobileSidebar;
