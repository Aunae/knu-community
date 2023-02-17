'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import styles from './newpost.module.scss';

const NewPost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  const onClick = () => {
    if (title.trim() === '') return;
    setSubmitDisabled(true);
    if (session && editor) {
      const send = async () => {
        const data = await axios
          .post('/api/post', {
            title,
            content: editor.getHTML(),
            published: true,
            session,
            category: null,
          })
          .then((res) => res.data);
        if (data.status === 200) router.push('/home');
        else {
          alert('등록에 실패했습니다. 다시 시도해주세요.');
        }
        setSubmitDisabled(false);
      };
      send();
    }
  };
  useEffect(() => {
    if (editorRef.current) {
      const editor = new Editor({
        el: editorRef.current,
        previewStyle: 'vertical',
        height: '100%',
        initialEditType: 'wysiwyg',
        initialValue: ' ',
        useCommandShortcut: true,
      });
      setEditor(editor);
    }
  }, []);
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
        <div ref={editorRef} className={styles.editor} />
        <div className={styles.submit_area}>
          <button className={styles.submit_button} disabled={submitDisabled} onClick={onClick}>
            등록
          </button>
        </div>
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
