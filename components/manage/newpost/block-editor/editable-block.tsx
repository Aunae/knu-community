'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './editable-block.module.scss';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { autoEditorCommands } from './editor-command/editor-command';
import { isParentHasTagName } from './editor-buttons';
interface Props {
  onBlockChange: (innerHTML: string, index: number) => void;
  onBlockClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
  onBlockCommand: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  draggableId: string;
  index: number;
  id: number;
  selected: boolean;
  block: string;
}

const ContentTag = ({ tagName, children, onClick, ...props }: { onClick: (e: any) => void; tagName?: string; children: React.ReactNode }) => {
  if (tagName === 'h1')
    return (
      <h1 style={{ width: '100%' }} onClick={onClick} {...props}>
        {children}
      </h1>
    );
  if (tagName === 'h2')
    return (
      <h2 style={{ width: '100%' }} onClick={onClick} {...props}>
        {children}
      </h2>
    );
  if (tagName === 'h3')
    return (
      <h3 style={{ width: '100%' }} onClick={onClick} {...props}>
        {children}
      </h3>
    );
  return (
    <div style={{ width: '100%' }} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const EditableBlock = ({ draggableId, index, selected, block, onBlockChange, onBlockClick, onBlockCommand }: Props) => {
  const [value, setValue] = useState<string>(' ');
  const [tag, setTag] = useState<any>('div');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('a', block);
    if (block) setValue(block);
  }, [block]);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (ref.current) {
      onBlockChange(ref.current.innerHTML, index);
    }
  }; // Text modified event
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {}; // Command event
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Click event
    onBlockClick(e, index);
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div className={styles.item} ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps} className={styles.draggable}>
            <MenuOpenIcon />
          </div>
          <ContentTag tagName={tag} onClick={onClick}>
            <div
              accessKey={`${index}`}
              className={`${styles.editor} custom_editor`}
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={ref}
              onInput={onInput}
              dangerouslySetInnerHTML={{ __html: value }}
              onKeyDown={onKeyDown}
            />
          </ContentTag>
        </div>
      )}
    </Draggable>
  );
};

export default EditableBlock;
