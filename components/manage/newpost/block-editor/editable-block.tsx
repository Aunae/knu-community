'use client';

import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './editable-block.module.scss';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface Props {
  onKeyDown: (e: any) => void;
  checkStyle: () => void;
  closeColorPickers: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
  index: number;
  draggableId: string;
  setBlock: (val: HTMLCollection) => void;
  block: HTMLCollection | null;
}

// TODO: focus 될 때만 editor id 붙이기.
const EditableBlock = ({ onKeyDown, checkStyle, closeColorPickers, onFocus, draggableId, index, block, setBlock }: Props) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    var htmlString = '';
    if (block)
      for (let i = 0; i < block.length; i++) {
        const outer = block.item(i)?.outerHTML;
        if (outer) htmlString += outer;
      }
    setValue(htmlString);
    console.log('block!', index);
  }, [block]);
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div className={styles.item}>
          <div {...provided.dragHandleProps} className={styles.draggable}>
            <MenuOpenIcon />
          </div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            onFocus={onFocus}
            className={styles.editor}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              const collection = (e.target as any).children as HTMLCollection;
              setBlock(collection);
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
