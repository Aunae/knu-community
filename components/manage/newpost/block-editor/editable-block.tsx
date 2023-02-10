'use client';

import { useEffect, useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './editable-block.module.scss';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { getInnerHTML } from './block-editor';

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

const HeadingSyntax = ['###&nbsp;', '##&nbsp;', '#&nbsp;'];

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
  useEffect(() => {
    if (block) setValue(block);
  }, [block]);

  useEffect(() => {
    console.log('rerender');
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
                if (innerHTML.includes('###&nbsp;') && tag !== 'h3') {
                  console.log('h3');
                  const replacedHTML = innerHTML.replace('###&nbsp;', '');
                  setTag('h3');
                  data(replacedHTML, true);
                } else if (innerHTML.includes('##&nbsp;') && tag !== 'h2') {
                  console.log('h2');
                  const replacedHTML = innerHTML.replace('##&nbsp;', '');
                  setTag('h2');
                  data(replacedHTML, true);
                } else if (innerHTML.includes('#&nbsp;') && tag !== 'h1') {
                  console.log('h1');
                  const replacedHTML = innerHTML.replace('#&nbsp;', '');
                  setTag('h1');
                  data(replacedHTML, true);
                } else {
                  data(innerHTML);
                  console.log('e');
                }
              }}
              dangerouslySetInnerHTML={{ __html: value }}
              onKeyDown={onKeyDown}
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
