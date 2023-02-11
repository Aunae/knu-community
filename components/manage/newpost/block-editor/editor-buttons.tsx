import styles from './editor-buttons.module.scss';
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
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import ColorLens from '../../../common/color/color-picker';
import { ButtonStyle } from './enums/button-type.enum';

interface Props {
  onClickEditButton: (aCommandName: string, showUI?: boolean | undefined, value?: string | undefined) => void;
  focusEditor: () => void;
  foreColorPicker: boolean;
  setForeColorPicker: (val: boolean) => void;
  backColorPicker: boolean;
  setBackColorPicker: (val: boolean) => void;
}
export const isParentHasTagName = (node: any, tagName: string, lastParentNodeId: string = 'editor'): boolean => {
  while (node !== undefined && node !== null && node.id !== lastParentNodeId) {
    if (node.tagName === tagName.toUpperCase()) return true;
    node = node?.parentNode;
  }
  return false;
};
const getFocusNode = (): Node | null | undefined => {
  return window.getSelection()?.focusNode;
};
const isSubscriptOnFocus = (): boolean => {
  var node: any = getFocusNode()?.parentNode;
  return isParentHasTagName(node, 'SUB');
};
const isSuperscriptOnFocus = (): boolean => {
  var node: any = getFocusNode()?.parentNode;
  return isParentHasTagName(node, 'SUP');
};
export const getButtonId = (style: ButtonStyle): string => `id_${style}`;
// 모든 스타일을 가져와서 버튼을 활성화/비활성화 합니다.
export const toggleCurrentStyles = () => {
  const styleList = Object.values(ButtonStyle);

  styleList.forEach((val) => {
    const element = document.getElementById(getButtonId(val));
    if (val === 'subscript') {
      if (isSubscriptOnFocus()) {
        element?.classList.add(styles.active);
      } else {
        element?.classList.remove(styles.active);
      }
    } else if (val === 'superscript') {
      if (isSuperscriptOnFocus()) {
        element?.classList.add(styles.active);
      } else {
        element?.classList.remove(styles.active);
      }
    } else if (document.queryCommandState(val)) {
      element?.classList.add(styles.active);
    } else {
      element?.classList.remove(styles.active);
    }
  });
  // foreColor 코드
  var node: any = getFocusNode()?.parentNode;
  while (node?.id !== 'editor' && node?.attributes?.color?.value === undefined) {
    node = node?.parentNode;
    if (node === undefined || node === null) break;
  }

  const selectionAreaForeColor = node?.attributes?.color?.value ?? '#000000';
  const foreColorElement = document.getElementById(`btn_foreColor`);
  if (foreColorElement) foreColorElement.style['color'] = selectionAreaForeColor === 'rgb(255, 255, 255)' ? '#000000' : selectionAreaForeColor;

  // hiliteColor 코드
  // 가장 가까운 부모의 background-color attribute를 얻는 코드
  var node: any = getFocusNode()?.parentNode;
  while (node?.id !== 'editor' && node?.attributes?.style?.value === undefined) {
    node = node?.parentNode;
    if (node === undefined || node === null) break;
  }

  const selectionAreaBackColor = node?.attributes?.style?.value?.substr(18)?.replace(';', '') ?? '#000000';
  const backColorElement = document.getElementById(`btn_hiliteColor`);
  if (backColorElement) backColorElement.style['color'] = selectionAreaBackColor === 'rgb(255, 255, 255)' ? '#000000' : selectionAreaBackColor;
};

const EditorButtons = ({ onClickEditButton, focusEditor, foreColorPicker, setForeColorPicker, backColorPicker, setBackColorPicker }: Props) => {
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

  const onClickImageButton = () => {
    document.getElementById('img-selector')?.click();
  };

  return (
    <>
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
              // FIXME: forecolor 해제해야함...
              if (color === 'none') onClickEditButton('foreColor', false, '#000000');
              else onClickEditButton('foreColor', false, color);
              () => setForeColorPicker(false);
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
              // FIXME: hilite 해제해야함...
              if (color === 'none') onClickEditButton('hiliteColor', true, '#ffffff');
              else onClickEditButton('hiliteColor', false, color);
              () => setForeColorPicker(false);
            }}
            onBlur={() => setBackColorPicker(false)}
            active={backColorPicker}
          />
        </button>
        <button id={getButtonId(ButtonStyle.justifyLeft)} className={styles.btn_bold} onClick={() => onClickEditButton(ButtonStyle.justifyLeft)}>
          <FormatAlignLeftIcon />
          <span className={styles.tooltiptext}>좌측 정렬</span>
        </button>
        <button id={getButtonId(ButtonStyle.justifyCenter)} className={styles.btn_bold} onClick={() => onClickEditButton(ButtonStyle.justifyCenter)}>
          <FormatAlignCenterIcon />
          <span className={styles.tooltiptext}>중앙 정렬</span>
        </button>
        <button id={getButtonId(ButtonStyle.justifyRight)} className={styles.btn_bold} onClick={() => onClickEditButton(ButtonStyle.justifyRight)}>
          <FormatAlignRightIcon />
          <span className={styles.tooltiptext}>우측 정렬</span>
        </button>
      </div>
      <div className={styles.menu}>
        <button id={getButtonId(ButtonStyle.bold)} className={styles.btn_bold} onClick={() => onClickEditButton(ButtonStyle.bold)}>
          <FormatBoldIcon />
          <span className={styles.tooltiptext}>굵기</span>
        </button>
        <button id={getButtonId(ButtonStyle.italic)} className={styles.btn_italic} onClick={() => onClickEditButton(ButtonStyle.italic)}>
          <FormatItalicIcon />
          <span className={styles.tooltiptext}>기울이기</span>
        </button>
        <button id={getButtonId(ButtonStyle.underline)} className={styles.btn_underline} onClick={() => onClickEditButton(ButtonStyle.underline)}>
          <FormatUnderlinedIcon />
          <span className={styles.tooltiptext}>밑줄</span>
        </button>
        <button id={getButtonId(ButtonStyle.strikeThrough)} className={styles.btn_strike} onClick={() => onClickEditButton(ButtonStyle.strikeThrough)}>
          <StrikethroughSIcon />
          <span className={styles.tooltiptext}>취소선</span>
        </button>
        <button
          id={getButtonId(ButtonStyle.subscript)}
          className={styles.btn_subscript}
          onClick={() => {
            onClickEditButton(ButtonStyle.subscript);
            if (isSubscriptOnFocus()) onClickEditButton(ButtonStyle.subscript);
          }}
        >
          <SubscriptIcon />
          <span className={styles.tooltiptext}>Subscript</span>
        </button>
        <button
          id={getButtonId(ButtonStyle.superscript)}
          className={styles.btn_superscript}
          onClick={() => {
            onClickEditButton(ButtonStyle.superscript);
            if (isSuperscriptOnFocus()) onClickEditButton(ButtonStyle.superscript);
          }}
        >
          <SuperscriptIcon />
          <span className={styles.tooltiptext}>Superscript</span>
        </button>
        <button
          id={getButtonId(ButtonStyle.insertOrderedList)}
          className={styles.btn_ordered_list}
          onClick={() => onClickEditButton(ButtonStyle.insertOrderedList)}
        >
          <FormatListNumberedIcon />
          <span className={styles.tooltiptext}>순서 있는 리스트</span>
        </button>
        <button
          id={getButtonId(ButtonStyle.insertUnorderedList)}
          className={styles.btn_unordered_list}
          onClick={() => onClickEditButton(ButtonStyle.insertUnorderedList)}
        >
          <FormatListBulletedIcon />
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
    </>
  );
};

export default EditorButtons;
