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
  id: number;
}

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

type Props = {};

// TODO: ondrag일 때 블럭을 delete할 수 있는 코드를 구현해야합니다.
// TODO: delete 이후에 Undo 기능을 구현해야합니다. (history)
const BlockEditorController = ({}: Props) => {
  const [foreColorPicker, setForeColorPicker] = useState(false);
  const [backColorPicker, setBackColorPicker] = useState(false);
  const blockCount = useRef(0);
  const [blocks, setBlocks] = useState<Block[]>([]); // 매 이벤트마다 변경되는 데이터
  const [renderingBlocks, setRenderingBlocks] = useState<Block[]>([]); // 렌더링 될 때만 적용되는 데이터
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [enabled] = useStrictDroppable(false);
  const [fontSize, setFontSize] = useState(3);
  const [__latestCommand, __setLatestCommand] = useState<string>('_'); // dev

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, defaultTagSeparator);
    const dev_console = (e: any) => {
      const selection = window.getSelection();
      if (selection) {
        const range: Range = selection.getRangeAt(0);
        console.log(range.startOffset, range.endOffset, selection.focusNode, selection.rangeCount);

        if (e?.key === 'q' && selection.focusNode) {
          e.preventDefault();
          const newRange: Range = document.createRange();
          newRange.selectNode(selection.focusNode);
          newRange.setStart(selection.focusNode, 1);
          newRange.setEnd(selection.focusNode, 1);
          selection.removeAllRanges();
          selection.addRange(newRange);
          // range.deleteContents();
        }
      }
    };
    // window.addEventListener('click', dev_console, false);
    // window.addEventListener('keydown', dev_console, false);
    addBlock();
    return () => {
      // window.removeEventListener('click', dev_console, false);
      // window.removeEventListener('keydown', dev_console, false);
    };
  }, []);

  // TODO: fore, back color picker
  const setStyle = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    document.execCommand(aCommandName, showUI, value);
    // 글의 상태를 옵션 UI에 업데이트합니다.
    checkStyle();
  };

  // Editor menus를 조작하는 function들
  const onClickEditButton = (aCommandName: string, showUI: boolean | undefined = undefined, value: string | undefined = undefined) => {
    setStyle(aCommandName, showUI, value);
  };

  const onSelectFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setFontSize(size);
    document.execCommand('fontSize', false, `${size}`);
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
   * deprecated - Excute when key down in editor container Editor commands
   * @param e
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // const editor = document.getElementById('editor');
    // if (e.key === 'Enter' && e.shiftKey.valueOf() == false) {
    //   if (editor) swapToDiv(editor); // First child를 div안에 넣는 코드
    // }
    // if (e.key === 'Enter' && e.shiftKey.valueOf() == true) {
    //   e.preventDefault();
    //   if (editor) {
    //     const index = parseInt(editor.accessKey);
    //     addBlock(index);
    //   }
    // }
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

  const addBlock = (index?: number) => {
    var tmp: Block[] = [];
    if (index === null || index === undefined) {
      tmp.push(...blocks);
      tmp.push({ id: blockCount.current, value: '' });
    } else {
      tmp.push(...blocks);
      tmp.splice(index + 1, 0, { id: blockCount.current, value: '' });
      setSelectedBlock(index + 1);
    }
    blockCount.current += 1;
    setBlocks(tmp);
    setRenderingBlocks(tmp);
  };

  const deleteBlock = (index: number) => {
    if (index < 0) return undefined;
    var tmp: Block[] = blocks;
    tmp.splice(index, 1);
    setBlocks(tmp);
    setRenderingBlocks(tmp);
  };

  const onBlockChange = (innerHTML: string, index: number) => {
    checkStyle();
    setBlocks((prev) => prev.map((block, i) => (i === index ? { ...block, value: innerHTML } : { ...block })));
  };
  const onBlockClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    checkStyle();
    setSelectedBlock(index);
  };

  const onBlockCommand = (command: string, state: string, index: number) => {
    // 빈 Editor에 Basckspace를 하면 블럭 사라짐
    if (command === 'Backspace' && state.trim() === '' && blocks.length !== 1) deleteBlock(index);
    if (command === 'Shift + Enter') {
      addBlock(index);
    }
    __setLatestCommand(command);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <EditorButtons
          fontSize={fontSize}
          onSelectFontSize={onSelectFontSize}
          onClickEditButton={onClickEditButton}
          {...{ foreColorPicker, setForeColorPicker, backColorPicker, setBackColorPicker }}
        />
        <div style={{ position: 'absolute', left: '0' }}>{__latestCommand}</div>
        <div id="send_editor_container" style={{ display: 'none' }}>
          {blocks.map((block) => (
            <div key={block.id} dangerouslySetInnerHTML={{ __html: block.value }} />
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
                      key={`${renderedBlock.id}-`}
                      draggableId={`draggableId_${renderedBlock.id}`}
                      onBlockChange={onBlockChange}
                      onBlockClick={onBlockClick}
                      onBlockCommand={onBlockCommand}
                      index={index}
                      id={renderedBlock.id}
                      selected={selectedBlock === index}
                      block={renderedBlock.value}
                      {...{ checkStyle, closeColorPickers, onKeyDown }}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <div className={styles.editor_add_block} onClick={() => addBlock()}>
            <AddIcon />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BlockEditorController;
