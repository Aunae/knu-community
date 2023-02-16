'use client';
import styles from './block-editor.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import EditorButtons, { isParentHasTagName, toggleCurrentStyles } from './editor-buttons';
import EditorContent from './editable-block';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useStrictDroppable } from '../../../hooks/useStrictDroppable';
import AddIcon from '@mui/icons-material/Add';
import { ButtonStyle } from './enums/button-type.enum';

const defaultTagSeparator = 'div';

export const getInnerHTML = (collection: HTMLCollection) => {
  var htmlString = '';
  for (let i = 0; i < collection.length; i++) {
    const outer = collection.item(i)?.outerHTML;
    if (outer) htmlString += outer;
  }
  return htmlString;
};

export const swapToDiv = (editor: HTMLElement) => {
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
};

export const focusEditor = () => {
  document.getElementById('editor')?.focus();
};
type Props = {};

// TODO: delete 이후에 Undo 기능을 구현해야합니다. (history)
const BlockEditorController = ({}: Props) => {
  const [foreColorPicker, setForeColorPicker] = useState(false);
  const [backColorPicker, setBackColorPicker] = useState(false);
  const blockCount = useRef(0);
  const [state, setState] = useState<string>('');
  const [fontSize, setFontSize] = useState(3);
  const [__latestCommand, __setLatestCommand] = useState<string>('_'); // dev

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, defaultTagSeparator);
  }, []);

  const setStyle = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    document.execCommand(aCommandName, showUI, value);
    // 글의 상태를 옵션 UI에 업데이트합니다.
    checkStyle();
    focusEditor();
  };

  // Editor menus를 조작하는 function들
  const onClickEditButton = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    setStyle(aCommandName, showUI, value);
  };

  const onSelectFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setFontSize(size);
    document.execCommand('fontSize', false, `${size}`);
    focusEditor();
  };

  const checkStyle = () => {
    toggleCurrentStyles();
    // contentEditable의 첫 번째 child를 수정합니다.
    const editor = document.getElementById('editor');
    if (editor) {
      // swapToDiv(editor);

      const ps = editor.getElementsByTagName(defaultTagSeparator);
      for (let i = 0; i < ps.length; i++) {
        ps[i].setAttribute('draggable', 'true');
      }
    }
  };

  const closeColorPickers = () => {
    setForeColorPicker(false);
    setBackColorPicker(false);
  };

  const removeAllQueryCommandState = () => {
    Object.values(ButtonStyle).forEach((val) => {
      if (document.queryCommandState(val)) document.execCommand(val);
    });
    document.execCommand('justifyLeft');
  };

  const onStateChange = (innerHTML: string) => {
    setState(innerHTML);
    checkStyle();
  };
  const onEditorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    checkStyle();
  };

  const onEditorCommand = (command: string, state: string) => {
    __setLatestCommand(command);
  };

  return (
    <div className={styles.container}>
      <EditorButtons
        fontSize={fontSize}
        onSelectFontSize={onSelectFontSize}
        onClickEditButton={onClickEditButton}
        {...{ foreColorPicker, setForeColorPicker, backColorPicker, setBackColorPicker }}
      />
      <div id="send_editor_container" style={{ display: 'none' }}>
        {state}
      </div>
      <div className={styles.editor_container}>
        <EditorContent
          placeholder={'내용을 입력해 주세요'}
          onStateChange={onStateChange}
          onEditorClick={onEditorClick}
          onEditorCommand={onEditorCommand}
          state={state}
          {...{ checkStyle, closeColorPickers }}
        />
        {/* <div className={styles.editor_add_block} onClick={(e) => {}}>
          <AddIcon />
        </div> */}
      </div>
    </div>
  );
};

export default BlockEditorController;
