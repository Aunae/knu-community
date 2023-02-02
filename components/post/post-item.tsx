import { Category, Post, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './post-item.module.scss';

const imageSrc = `https://images.unsplash.com/photo-1674354419830-fe4ac561f651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`;

type Props = {
  post: any;
};
const PostComponent = ({ post }: Props) => {
  const date = new Date(post.createdAt).toLocaleDateString();
  return (
    <div className={styles.container}>
      <div>
        {/* <Image src={`${imageSrc}`} alt={`image`} width={63} height={63}></Image> */}
        <span className={styles.cate}>{post.category.name}</span>
        <Link href={`/board/${post.id}`} className={styles.title}>
          <span>{post.title}</span>
        </Link>
        <span className={styles.name}>{post.author.name}</span>
        <span className={styles.time}>{date}</span>
        <span className={styles.view}>{'1,321' /* post.view */}</span>
      </div>
    </div>
  );
};

export default PostComponent;
