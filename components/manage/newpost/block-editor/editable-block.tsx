'use client';

import { useEffect, useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './editable-block.module.scss';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { autoEditorCommands } from './editor-command/editor-command';
import { isParentHasTagName } from './editor-buttons';
interface Props {
  onKeyDown: (e: any) => void;
  checkStyle: () => void;
  closeColorPickers: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement, Element>, index: number) => void;
  index: number;
  selected: boolean;
  draggableId: string;
  data: (val: string, rerender?: boolean) => void;
  block: string;
  rerenderRef: number;
}

const ContentTag = ({ tagName, children, ...props }: { tagName?: string; children: React.ReactNode }) => {
  if (tagName === 'h1')
    return (
      <h1 style={{ width: '100%' }} {...props}>
        {children}
      </h1>
    );
  if (tagName === 'h2')
    return (
      <h2 style={{ width: '100%' }} {...props}>
        {children}
      </h2>
    );
  if (tagName === 'h3')
    return (
      <h3 style={{ width: '100%' }} {...props}>
        {children}
      </h3>
    );
  return (
    <div style={{ width: '100%' }} {...props}>
      {children}
    </div>
  );
};

const EditableBlock = ({ onKeyDown, checkStyle, closeColorPickers, onFocus, draggableId, index, selected, block, data, rerenderRef }: Props) => {
  const [value, setValue] = useState<string>('');
  const [tag, setTag] = useState<any>('div');
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDownInBlock = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'e' || e.key === 'E') && e.ctrlKey.valueOf() === true) {
      const selection = window.getSelection()?.getRangeAt(0);
      const selectedText = selection?.extractContents().textContent;
      // selection이 code tag안에 포함된 코드가 있다면, 해제할 수 있도록 할 것.
      if (isParentHasTagName(window.getSelection()?.focusNode?.parentNode, 'CODE')) {
        e.preventDefault();
        const insertText = selectedText === null || selectedText === undefined ? 'null' : selectedText;
        document.execCommand('insertText', false, insertText);
        return false;
      } else {
        const code = document.createElement('code');
        if (selection) {
          e.preventDefault();
          const insertText = selectedText === null || selectedText === undefined ? 'null' : selectedText;
          code.append(insertText);
          selection.insertNode(code);
          return false;
        }
      }
    }
    if (e.key === 'Delete') {
      window.getSelection()?.focusNode?.nextSibling?.remove();
    }
    if (e.key === 'Backspace') {
      const prev = window.getSelection()?.focusNode?.previousSibling;
      const endOffset = window.getSelection()?.getRangeAt(0).endOffset;
      if (prev === null && endOffset === 0) {
        setTag('div');
        const innerHTML: string = (e.target as any).innerHTML;
        data(innerHTML, true);
        setValue(innerHTML);
        console.log('Ma:', innerHTML);
        document.execCommand('removeFormat');
      }
    }
  };
  useEffect(() => {
    if (block) setValue(block);
  }, [block]);

  useEffect(() => {
    // console.log('rerender');
  }, [rerenderRef]);

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.focus();
    }
  }, [selected, rerenderRef]);
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div className={styles.item} ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps} className={styles.draggable}>
            <MenuOpenIcon />
          </div>
          <ContentTag tagName={tag}>
            <div
              accessKey={`${index}`}
              onFocus={(e) => onFocus(e, index)}
              className={`${styles.editor} custom_editor`}
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={ref}
              onInput={(e) => {
                // TODO: cursor가 제일 오른쪽인 상태에서 backspace를 하면 tagname이 div로 바뀌기
                const innerHTML: string = (e.target as any).innerHTML;
                var isChanged = false;
                Object.values(autoEditorCommands).forEach((val) => {
                  if (!isChanged && innerHTML.includes(val.command) && tag !== val.value) {
                    setTag(val.value);
                    data(innerHTML.replace(val.command, ''), true);
                    isChanged = true;
                  }
                });
                if (!isChanged) {
                  data(innerHTML);
                }
              }}
              dangerouslySetInnerHTML={{ __html: value }}
              onKeyDown={(e) => {
                onKeyDownInBlock(e);
                onKeyDown(e);
              }}
              onKeyUp={checkStyle}
              onMouseDown={checkStyle}
              onClick={() => {
                checkStyle();
                closeColorPickers();
              }}
            />
          </ContentTag>
        </div>
      )}
    </Draggable>
  );
};

export default EditableBlock;
