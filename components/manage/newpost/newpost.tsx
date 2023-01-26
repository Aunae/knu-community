'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PostController from '../../../pages/api/post';
import BlockEditor from './block-editor';
import Editor from './editor';
import styles from './newpost.module.scss';

const NewPost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const onClick = () => {
    setSubmitDisabled(true);
    const element = document.getElementById('editor');
    if (element?.innerHTML) localStorage.setItem('temp', element.innerHTML);
    // console.log('inner:', element?.innerHTML);
    // TODO: post posts.
    if (session && element) {
      const send = async () => {
        const data = await axios
          .post('/api/post', {
            title,
            content: element.innerHTML,
            published: true,
            session,
            category: null,
          })
          .then((res) => res.data);
        if (data.status === 200) router.push('/home');
        else {
          alert('등록에 실패했습니다. 다시 시도해주세요.');
          setSubmitDisabled(false);
        }
      };
      send();
    }
  };
  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'unauthenticated') return <div>로그인이 필요합니다.</div>;
  if (status === 'authenticated')
    return (
      <div className={styles.container}>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
          placeholder="제목을 입력해 주세요"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              return false;
            }
          }}
        ></textarea>
        {false ? <Editor /> : <BlockEditor />}
        <button disabled={submitDisabled} onClick={onClick}>
          등록
        </button>
      </div>
    );
  return <div>뭔가 잘못 되었습니다...</div>;
};
/**
 * category - 미정
 * title
 * content
 * author
 * created date
 * updated date
 * deleted date
 *
 */
export default NewPost;
