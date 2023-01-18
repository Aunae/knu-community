import Header from './header';
import { getMockCategories } from '../../../libs/utils/mock-category';

interface Props {}

const HeaderWrapper = async ({}: Props) => {
  const { data: categories } = await getMockCategories();

  return <Header categories={categories} />;
};

export default HeaderWrapper;
