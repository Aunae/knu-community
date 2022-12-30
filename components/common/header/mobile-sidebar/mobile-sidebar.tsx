import { CategoryWithChildren } from '../../../../libs/models/category';
import AuthorizedSidebar from './authorized-sidebar';
import UnAuthorizedSidebar from './un-authorized-sidebar';
import { Session } from 'next-auth';

interface Props {
  categories: CategoryWithChildren[];
  open: Boolean;
  handleClose: () => void;
  session: Session;
}

const MobileSidebar = ({ session, open, handleClose, categories }: Props) => {
  return (
    open && (
      <aside>
        <section className="grid bg-gray-100 w-64 h-screen fixed left-0 top-0 z-20">
          {session ? (
            <AuthorizedSidebar categories={categories} handleClose={handleClose} />
          ) : (
            <UnAuthorizedSidebar categories={categories} handleClose={handleClose} />
          )}
        </section>

        {/*클릭시 모달 닫히는 영역*/}
        <section className={'h-screen bg-gray-300'} onClick={handleClose} />
      </aside>
    )
  );
};

export default MobileSidebar;
