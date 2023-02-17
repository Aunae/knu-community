'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './editable-block.module.scss';
interface Props {
  onStateChange: (innerHTML: string) => void;
  onEditorClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditorCommand: (command: string, value: string) => void;
  onEditorBlur?: () => void;
  onEditorFocus?: () => void;
  state: string;
  placeholder: string;
}

const EditorContent = ({ placeholder, state, onStateChange, onEditorBlur, onEditorFocus, onEditorClick, onEditorCommand }: Props) => {
  const [text, setText] = useState<string>(placeholder);
  const [renderedText, setRenderedText] = useState<string>(placeholder);
  const [tag, setTag] = useState<any>('div');
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<Range | null>();
  const isPlaceholder = placeholder === renderedText;

  useEffect(() => {
    if (state) setText(state);
  }, [state]);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (ref.current) {
      onStateChange(ref.current.innerHTML);
      setText(ref.current.innerHTML);
      // console.log(`"${window.getSelection()?.focusNode?.textContent}"`);
    }
  }; // Text modified event
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const command = handleKeyCommand(e);
    if (command && ref.current) onEditorCommand(command, ref.current.innerHTML);
  }; // Command event
  const handleKeyCommand = (e: React.KeyboardEvent<any>): string | null => {
    const shift: boolean = e.shiftKey.valueOf();
    const ctrl: boolean = e.ctrlKey.valueOf();
    const key: string = e.code;
    if (shift === false && ctrl === false && key === 'Space') return 'Space';
    if (shift === false && ctrl === false && key === 'Backspace') return 'Backspace';
    if (shift === false && ctrl === false && (key === 'Enter' || key === 'NumpadEnter')) return 'Enter';
    if (shift === true && ctrl === false && key === 'Enter') return `Shift + Enter`;
    if (shift === false && ctrl === true && key === 'Enter') return 'Ctrl + Enter';
    if (shift === false && ctrl === true && key === 'KeyB') return 'bold';
    if (shift === false && ctrl === true && key === 'KeyI') return 'italic';
    if (shift === false && ctrl === true && key === 'KeyU') return 'underline';
    if (shift === false && ctrl === true && key === 'KeyE') {
      e.preventDefault();
      return 'inline-code';
    }
    return null;
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Click event
    onEditorClick(e);
  };

  const onFocus = () => {
    if (renderedText === placeholder) setRenderedText('');
  };

  const onBlur = () => {
    setRenderedText(text);
    if (text === '') setRenderedText(placeholder);
  };

  return (
    <div className={styles.item}>
      <div
        onClick={onClick}
        placeholder={placeholder}
        id="editor"
        className={`${styles.editor} custom_editor ${isPlaceholder ? styles.placeholder : ''}`}
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: renderedText }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default EditorContent;
