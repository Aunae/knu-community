import CommentFloatingButton from './comment-floating-button';
import { MdAccountCircle as MockIcon, MdComment as CommentIcon, MdMoreVert as CommentOptionIcon, MdThumbUp as LikeIcon } from 'react-icons/md';
import styles from './article.module.scss';
import Link from 'next/link';

type Props = {
  post: any;
};

const convertDate = (date: string): string => {
  return date.replace('Z', ' ').replace('T', ' ').replaceAll('-', '.').substring(0, 16);
};

const Article = ({ post }: Props) => {
  const isModified: boolean = post.createdAt.valueOf() !== post.updatedAt.valueOf();
  const updatedAt = convertDate(post.createdAt);

  return (
    <section className={styles.article_container}>
      <section className={styles.title}>
        {/** TODO: link to category board */}
        <Link href="/" className={styles.category}>
          {post.category.name}
        </Link>
        <h1>{post.title}</h1>
        <div className={styles.info_post}>
          <span>{post.author.name}</span>
          <span>
            {updatedAt}
            {isModified ? '(수정됨)' : null}
          </span>
        </div>
      </section>
      <div className={styles.line} />
      <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className={styles.line} />
      <section></section>
    </section>
  );
};

export default Article;
/**
 * TODO: article, section 태그 이용해서 포스트 구조 및 css 작성
 */
