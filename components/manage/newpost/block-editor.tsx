'use client';
import styles from './block-editor.module.scss';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import React, { useEffect, useState } from 'react';
import ColorLens from '../../common/color/color-picker';

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
  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, defaultTagSeparator);
  }, []);
  const focusEditor = () => {
    document.getElementById('editor')?.focus({ preventScroll: true });
  };
  // TODO: fore, back color picker
  const [foreColorPicker, setForeColorPicker] = useState(false);
  const [backColorPicker, setBackColorPicker] = useState(false);
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
    if (foreColorElement) foreColorElement.style['color'] = selectionAreaForeColor;

    // hiliteColor 코드
    // 가장 가까운 부모의 background-color attribute를 얻는 코드
    var node: any = window.getSelection()?.focusNode?.parentNode;
    while (node?.id !== 'editor' && node?.attributes?.style?.value === undefined) {
      node = node?.parentNode;
      if (node === undefined || node === null) break;
    }

    const selectionAreaBackColor = node?.attributes?.style?.value?.substr(18)?.replace(';', '') ?? '#000000';
    const backColorElement = document.getElementById(`btn_hiliteColor`);
    if (backColorElement) backColorElement.style['color'] = selectionAreaBackColor;
  };

  const onClickImageButton = () => {
    document.getElementById('img-selector')?.click();
  };

  const insertImageDate = (file: any) => {
    const reader = new FileReader();
    console.log('reader: ', reader);
    reader.addEventListener('load', function (e) {
      console.log('reader eventListener called');
      focusEditor();
      document.execCommand('insertImage', false, `${reader.result}`);
    });
    reader.readAsDataURL(file);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    checkStyle();
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          id="btn_foreColor"
          className={styles.btn_foreColor}
          onFocus={() => setForeColorPicker(true)}
          // onClick={() => onClickEditButton('foreColor', false, '#ff0000')} hiliteColor
        >
          <FormatColorTextIcon />
          <span className={styles.tooltiptext}>색상</span>
          <ColorLens
            setColor={(color: string) => {
              onClickEditButton('foreColor', false, color);
            }}
            onBlur={() => setForeColorPicker(false)}
            active={foreColorPicker}
          />
        </button>
        <button id="btn_hiliteColor" className={styles.btn_bold} onFocus={() => setBackColorPicker(true)} onClick={() => onClickEditButton('')}>
          <FontDownloadIcon />
          <span className={styles.tooltiptext}>폰트배경색상</span>
          <ColorLens
            setColor={(color: string) => {
              onClickEditButton('hiliteColor', false, color);
            }}
            onBlur={() => setBackColorPicker(false)}
            active={backColorPicker}
          />
        </button>
        <button id="btn_justifyLeft" className={styles.btn_bold} onClick={() => onClickEditButton('justifyLeft')}>
          <FormatAlignLeftIcon />
          <span className={styles.tooltiptext}>좌측 정렬</span>
        </button>
        <button id="btn_justifyCenter" className={styles.btn_bold} onClick={() => onClickEditButton('justifyCenter')}>
          <FormatAlignCenterIcon />
          <span className={styles.tooltiptext}>중앙 정렬</span>
        </button>
        <button id="btn_justifyRight" className={styles.btn_bold} onClick={() => onClickEditButton('justifyRight')}>
          <FormatAlignRightIcon />
          <span className={styles.tooltiptext}>우측 정렬</span>
        </button>
      </div>
      <div className={styles.menu}>
        <button id="btn_bold" className={styles.btn_bold} onClick={() => onClickEditButton('bold')}>
          <FormatBoldIcon />
          <span className={styles.tooltiptext}>굵기</span>
        </button>
        <button id="btn_italic" className={styles.btn_italic} onClick={() => onClickEditButton('italic')}>
          <FormatItalicIcon />
          <span className={styles.tooltiptext}>기울이기</span>
        </button>
        <button id="btn_underline" className={styles.btn_underline} onClick={() => onClickEditButton('underline')}>
          <FormatUnderlinedIcon />
          <span className={styles.tooltiptext}>밑줄</span>
        </button>
        <button id="btn_strikeThrough" className={styles.btn_strike} onClick={() => onClickEditButton('strikeThrough')}>
          <StrikethroughSIcon />
          <span className={styles.tooltiptext}>취소선</span>
        </button>
        <button id="btn_insertOrderedList" className={styles.btn_ordered_list} onClick={() => onClickEditButton('insertOrderedList')}>
          <FormatListBulletedIcon />
          <span className={styles.tooltiptext}>순서 있는 리스트</span>
        </button>
        <button id="btn_insertUnorderedList" className={styles.btn_unordered_list} onClick={() => onClickEditButton('insertUnorderedList')}>
          <FormatListNumberedIcon />
          <span className={styles.tooltiptext}>순서 없는 리스트</span>
        </button>
        <button id="btn_image" className={styles.btn_image} onClick={() => onClickImageButton()}>
          <ImageIcon />
          <span className={styles.tooltiptext}>사진 업로드</span>
        </button>
        <input
          id="img-selector"
          type="file"
          accept="image/*"
          style={{ display: `none` }}
          onChange={(e) => {
            const files = e.target.files;
            if (!!files) {
              console.log('insertImageDate', files[0]);
              insertImageDate(files[0]);
            }
          }}
        />
      </div>
      <div
        id="editor"
        className={styles.editor}
        contentEditable
        onChange={(e) => console.log(e)}
        onKeyDown={onKeyDown}
        onKeyUp={checkStyle}
        onMouseDown={checkStyle}
        onClick={() => {
          checkStyle();
        }}
      />
    </div>
  );
};

export default BlockEditor;
