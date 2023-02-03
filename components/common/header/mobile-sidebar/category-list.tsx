import { CategoryWithChildren } from '../../../../libs/models/category';
import Accordion from './accordion';

interface Props {
  categories: CategoryWithChildren[];
}

const CategoryList = ({ categories }: Props) => {
  return (
    <ul className="py-4">
      {categories.map((cate) => (
        <Accordion key={cate.id} category={cate} />
      ))}
    </ul>
  );
};

export default CategoryList;
