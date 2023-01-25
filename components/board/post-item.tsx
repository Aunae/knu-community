import { Category, Post, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.scss';

const imageSrc = `https://images.unsplash.com/photo-1674354419830-fe4ac561f651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`;

type Props = {
  post: Post & {
    author: User;
    category: Category;
  };
};
const PostComponent = ({ post }: Props) => {
  return (
    <Link href={`/board/${post.id}`} className={styles.container}>
      <Image src={`${imageSrc}`} alt={`image`} width={63} height={63}></Image>
      <div>
        <h2>{post.title}</h2>
        <div className={styles.info}>
          <span>{post.author.name}</span>
          <span>{post.createdAt.toLocaleDateString()}</span>
          <span>{`123 views`}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostComponent;
