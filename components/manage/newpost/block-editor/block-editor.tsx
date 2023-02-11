'use client';
import styles from './block-editor.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import EditorButtons, { isParentHasTagName, toggleCurrentStyles } from './editor-buttons';
import EditableBlock from './editable-block';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useStrictDroppable } from '../../../hooks/useStrictDroppable';
import AddIcon from '@mui/icons-material/Add';
import { ButtonStyle } from './enums/button-type.enum';

const defaultTagSeparator = 'div';

interface Block {
  value: string;
  index: number;
}

export const getInnerHTML = (collection: HTMLCollection) => {
  var htmlString = '';
  for (let i = 0; i < collection.length; i++) {
    const outer = collection.item(i)?.outerHTML;
    if (outer) htmlString += outer;
  }
  return htmlString;
};

export const focusEditor = () => {
  document.getElementById('editor')?.focus({ preventScroll: true });
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

type Props = {};

// TODO: ondrag일 때 블럭을 delete할 수 있는 코드를 구현해야합니다.
// TODO: delete 이후에 Undo 기능을 구현해야합니다. (history)
const BlockEditor = ({}: Props) => {
  const [foreColorPicker, setForeColorPicker] = useState(false);
  const [backColorPicker, setBackColorPicker] = useState(false);
  const blockCount = useRef(0);
  const rerenderRef = useRef(0);
  const [blocks, setBlocks] = useState<Block[]>([]); // 매 이벤트마다 변경되는 데이터
  const [renderingBlocks, setRenderingBlocks] = useState<Block[]>([]); // 렌더링 될 때만 적용되는 데이터
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [enabled] = useStrictDroppable(false);

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, defaultTagSeparator);
    addNewBlock();
  }, []);

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
      // swapToDiv(editor);

      const ps = editor.getElementsByTagName(defaultTagSeparator);
      for (let i = 0; i < ps.length; i++) {
        ps[i].setAttribute('draggable', 'true');
      }
    }
  };

  /**
   * Excute when key down in editor container Editor commands
   * @param e
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const editor = document.getElementById('editor');
    if (e.key === 'Enter' && e.shiftKey.valueOf() == false) {
      if (editor) swapToDiv(editor); // First child를 div안에 넣는 코드
    }
    if (e.key === 'Enter' && e.shiftKey.valueOf() == true) {
      e.preventDefault();
      if (editor) {
        const index = parseInt(editor.accessKey);
        addNewBlock(index);
      }
    }
  };

  const closeColorPickers = () => {
    setForeColorPicker(false);
    setBackColorPicker(false);
  };

  // EditableBlock들의 focus를 조율하는 함수
  const onFocusBlock = (e: React.FocusEvent<HTMLDivElement, Element>, index: number) => {
    const focusedBlock = document.getElementById('editor');
    setSelectedBlock(index);
    if (focusedBlock) {
      focusedBlock.id = '';
    }
    e.target.id = 'editor';
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add: Block;
    let newBlock = blocks;

    add = newBlock[source.index];
    newBlock.splice(source.index, 1);
    newBlock.splice(destination.index, 0, add);
    setBlocks(newBlock);
    setRenderingBlocks(newBlock);
    setSelectedBlock(destination.index);
  };

  const removeAllQueryCommandState = () => {
    Object.values(ButtonStyle).forEach((val) => {
      if (document.queryCommandState(val)) document.execCommand(val);
    });
    document.execCommand('justifyLeft');
  };

  const addNewBlock = (index?: number) => {
    var tmp: Block[] = [];
    if (index === null || index === undefined) {
      tmp.push(...blocks);
      tmp.push({ index: blockCount.current, value: '' });
    } else {
      tmp.push(...blocks);
      tmp.splice(index + 1, 0, { index: blockCount.current, value: '' });
      setSelectedBlock(index + 1);
    }
    blockCount.current += 1;
    setBlocks(tmp);
    setRenderingBlocks(tmp);
  };

  const rerenderWithBlocks = (blocks: Block[]) => {
    setRenderingBlocks(blocks);
    rerenderRef.current++;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <EditorButtons
          onClickEditButton={onClickEditButton}
          focusEditor={focusEditor}
          {...{ foreColorPicker, setForeColorPicker, backColorPicker, setBackColorPicker }}
        />
        <div id="send_editor_container" style={{ display: 'none' }}>
          {blocks.map((block) => (
            <div dangerouslySetInnerHTML={{ __html: block.value ?? '' }} />
          ))}
        </div>
        <div className={styles.editor_container}>
          {/* Drappable Block Editor List */}
          {enabled && (
            <Droppable droppableId="edit_block_droppable">
              {(provided) => (
                <div id="editor_container" ref={provided.innerRef} {...provided.droppableProps}>
                  {renderingBlocks.map((renderedBlock, index) => (
                    <EditableBlock
                      key={`${renderedBlock.index}-`}
                      draggableId={`draggableId_${renderedBlock.index}`}
                      index={index}
                      block={renderedBlock.value}
                      selected={selectedBlock === index}
                      data={(innerHTML: string, re?: boolean) => {
                        var newBlocks = renderingBlocks;
                        newBlocks = newBlocks.map((v, i) => (v.index === renderedBlock.index ? { ...v, value: innerHTML } : v));
                        setBlocks(newBlocks);
                        console.log('Block rendering index is:', renderedBlock.index);
                        if (re === true) rerenderWithBlocks(newBlocks);
                      }}
                      onFocus={onFocusBlock}
                      rerenderRef={rerenderRef.current}
                      {...{ checkStyle, closeColorPickers, onKeyDown }}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <div className={styles.editor_add_block} onClick={() => addNewBlock()}>
            <AddIcon />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BlockEditor;
