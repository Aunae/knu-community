'use client';

import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './editable-block.module.scss';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { getInnerHTML } from './block-editor';

interface Props {
  onKeyDown: (e: any) => void;
  checkStyle: () => void;
  closeColorPickers: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
  index: number;
  selected: boolean;
  draggableId: string;
  data: (val: string) => void;
  block: string | null;
}

const EditableBlock = ({ onKeyDown, checkStyle, closeColorPickers, onFocus, draggableId, index, selected, block, data }: Props) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    // if (block) setValue(getInnerHTML(block));
    if (block) setValue(block);
  }, [block]);

  useEffect(() => {}, [selected]);
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div className={styles.item}>
          <div {...provided.dragHandleProps} className={styles.draggable}>
            <MenuOpenIcon />
          </div>
          <div
            accessKey={`${index}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            onFocus={onFocus}
            className={`${styles.editor} custom_editor`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              const innerHTML: string = (e.target as any).innerHTML;
              data(innerHTML);
            }}
            dangerouslySetInnerHTML={{ __html: value }}
            onKeyDown={onKeyDown}
            onKeyUp={checkStyle}
            onMouseDown={checkStyle}
            onClick={() => {
              checkStyle();
              closeColorPickers();
            }}
          ></div>
        </div>
      )}
    </Draggable>
  );
};

export default EditableBlock;
