'use client';
import styles from './block-editor.module.scss';
import React, { useEffect, useState } from 'react';
import ColorLens from '../../../common/color/color-picker';
import EditorButtons from './editor-buttons';

enum ButtonStyle {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strikeThrough = 'strikeThrough',
  insertOrderedList = 'insertOrderedList',
  insertUnorderedLis = 'insertUnorderedList',
  justifyLeft = 'justifyLeft',
  justifyCenter = 'justifyCenter',
  justifyRight = 'justifyRight',
}

const defaultTagSeparator = 'div';

type Props = {};
const BlockEditor = ({}: Props) => {
  const [foreColorPicker, setForeColorPicker] = useState(false);
  const [backColorPicker, setBackColorPicker] = useState(false);

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, defaultTagSeparator);
  }, []);
  const focusEditor = () => {
    document.getElementById('editor')?.focus({ preventScroll: true });
  };

  // TODO: fore, back color picker
  const setStyle = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    document.execCommand(aCommandName, showUI, value);
    // editor에 focus를 둡니다.
    focusEditor();
    // 글의 상태를 옵션 UI에 업데이트합니다.
    checkStyle();
  };

  const onClickEditButton = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    setStyle(aCommandName, showUI, value);
  };

  const checkStyle = () => {
    toggleCurrentStyles();
    // contentEditable의 첫 번째 child를 수정합니다.
    const editor = document.getElementById('editor');
    if (editor) {
      // console.log(editor.childNodes);
      if (editor.childNodes[0]?.nodeName === '#text') {
        const str = editor.childNodes[0].nodeValue;
        const p = document.createElement(defaultTagSeparator);
        if (str) p.append(str);
        editor.appendChild(p);
        editor.childNodes[0].remove();
        var range, selection;
        if (document.createRange) {
          //Firefox, Chrome, Opera, Safari, IE 9+
          range = document.createRange(); //Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(editor); //Select the entire contents of the element with the range
          range?.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
          selection = window.getSelection(); //get the selection object (allows you to change selection)
          selection?.removeAllRanges(); //remove any selections already made
          selection?.addRange(range); //make the range you have just created the visible selection
        } else if ((document as any).selection) {
          //IE 8 and lower
          range = (document.body as any).createTextRange(); //Create a range (a range is a like the selection but invisible)
          range.moveToElementText(editor); //Select the entire contents of the element with the range
          range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
          range.select(); //Select the range (make it the visible selection
        }
      }

      const ps = editor.getElementsByTagName(defaultTagSeparator);
      // console.log(ps);
      for (let i = 0; i < ps.length; i++) {
        ps[i].setAttribute('draggable', 'true');
      }
    }
  };

  // 모든 스타일을 가져와서 버튼을 활성화/비활성화 합니다.
  const toggleCurrentStyles = () => {
    const styleList = Object.values(ButtonStyle);
    styleList.forEach((val) => {
      const element = document.getElementById(`btn_${val}`);
      if (document.queryCommandState(val)) {
        element?.classList.add(`${styles.active}`);
      } else {
        element?.classList.remove(`${styles.active}`);
      }
    });
    // foreColor 코드
    var node: any = window.getSelection()?.focusNode?.parentNode;
    while (node?.id !== 'editor' && node?.attributes?.color?.value === undefined) {
      node = node?.parentNode;
      if (node === undefined || node === null) break;
    }

    const selectionAreaForeColor = node?.attributes?.color?.value ?? '#000000';
    const foreColorElement = document.getElementById(`btn_foreColor`);
    if (foreColorElement) foreColorElement.style['color'] = selectionAreaForeColor === 'rgb(255, 255, 255)' ? '#000000' : selectionAreaForeColor;

    // hiliteColor 코드
    // 가장 가까운 부모의 background-color attribute를 얻는 코드
    var node: any = window.getSelection()?.focusNode?.parentNode;
    while (node?.id !== 'editor' && node?.attributes?.style?.value === undefined) {
      node = node?.parentNode;
      if (node === undefined || node === null) break;
    }

    const selectionAreaBackColor = node?.attributes?.style?.value?.substr(18)?.replace(';', '') ?? '#000000';
    const backColorElement = document.getElementById(`btn_hiliteColor`);
    if (backColorElement) backColorElement.style['color'] = selectionAreaBackColor === 'rgb(255, 255, 255)' ? '#000000' : selectionAreaBackColor;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    checkStyle();
  };

  const closeColorPickers = () => {
    setForeColorPicker(false);
    setBackColorPicker(false);
  };

  return (
    <div className={styles.container}>
      <EditorButtons
        onClickEditButton={onClickEditButton}
        focusEditor={focusEditor}
        {...{ foreColorPicker, setForeColorPicker, backColorPicker, setBackColorPicker }}
      />
      <div
        id="editor"
        className={styles.editor}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onChange={(e) => console.log(e)}
        onKeyDown={onKeyDown}
        onKeyUp={checkStyle}
        onMouseDown={checkStyle}
        onClick={() => {
          checkStyle();
          closeColorPickers();
        }}
      >
        <div className={styles.block} contentEditable={true}></div>
      </div>
    </div>
  );
};

export default BlockEditor;
