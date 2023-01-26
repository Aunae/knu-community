import styles from './color-picker.module.scss';

type Props = {
  active: boolean;
  onBlur: () => void;
  setColor: (color: string) => void;
};
/**
 *
 * @param param0 color must be hex string
 */
const ColorLens = ({ active, onBlur, setColor }: Props) => {
  // FIXME: onBlur 잘 안되는 버그 수정
  return (
    <>
      {active && (
        <div className={styles.container} onBlur={() => onBlur()}>
          <div className={styles.palette}>
            <table></table>
          </div>
          <div>더보기</div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette se-color-palette-no-color"
                color=""
                title="색상 없음"
              >
                <span className="se-blind">색상 없음</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#999999"
                title="#999999"
                style={{ backgroundColor: 'rgb(153, 153, 153)' }}
              >
                <span className="se-blind">#999999</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffcdc0"
                title="#ffcdc0"
                style={{ backgroundColor: 'rgb(255, 205, 192)' }}
              >
                <span className="se-blind">#ffcdc0</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffe3c8"
                title="#ffe3c8"
                style={{ backgroundColor: 'rgb(255, 227, 200)' }}
              >
                <span className="se-blind">#ffe3c8</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#fff8b2"
                title="#fff8b2"
                style={{ backgroundColor: 'rgb(255, 248, 178)' }}
              >
                <span className="se-blind">#fff8b2</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#e3fdc8"
                title="#e3fdc8"
                style={{ backgroundColor: 'rgb(227, 253, 200)' }}
              >
                <span className="se-blind">#e3fdc8</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#c2f4db"
                title="#c2f4db"
                style={{ backgroundColor: 'rgb(194, 244, 219)' }}
              >
                <span className="se-blind">#c2f4db</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#bdfbfa"
                title="#bdfbfa"
                style={{ backgroundColor: 'rgb(189, 251, 250)' }}
              >
                <span className="se-blind">#bdfbfa</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#b0f1ff"
                title="#b0f1ff"
                style={{ backgroundColor: 'rgb(176, 241, 255)' }}
              >
                <span className="se-blind">#b0f1ff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#9bdfff"
                title="#9bdfff"
                style={{ backgroundColor: 'rgb(155, 223, 255)' }}
              >
                <span className="se-blind">#9bdfff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#fdd5f5"
                title="#fdd5f5"
                style={{ backgroundColor: 'rgb(253, 213, 245)' }}
              >
                <span className="se-blind">#fdd5f5</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffb7de"
                title="#ffb7de"
                style={{ backgroundColor: 'rgb(255, 183, 222)' }}
              >
                <span className="se-blind">#ffb7de</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffffff"
                title="#ffffff"
                style={{ backgroundColor: 'rgb(255, 255, 255)' }}
              >
                <span className="se-blind">#ffffff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#777777"
                title="#777777"
                style={{ backgroundColor: 'rgb(119, 119, 119)' }}
              >
                <span className="se-blind">#777777</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffad98"
                title="#ffad98"
                style={{ backgroundColor: 'rgb(255, 173, 152)' }}
              >
                <span className="se-blind">#ffad98</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffd1a4"
                title="#ffd1a4"
                style={{ backgroundColor: 'rgb(255, 209, 164)' }}
              >
                <span className="se-blind">#ffd1a4</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#fff593"
                title="#fff593"
                style={{ backgroundColor: 'rgb(255, 245, 147)' }}
              >
                <span className="se-blind">#fff593</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#badf98"
                title="#badf98"
                style={{ backgroundColor: 'rgb(186, 223, 152)' }}
              >
                <span className="se-blind">#badf98</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#3fcc9c"
                title="#3fcc9c"
                style={{ backgroundColor: 'rgb(63, 204, 156)' }}
              >
                <span className="se-blind">#3fcc9c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#15d0ca"
                title="#15d0ca"
                style={{ backgroundColor: 'rgb(21, 208, 202)' }}
              >
                <span className="se-blind">#15d0ca</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#28e1ff"
                title="#28e1ff"
                style={{ backgroundColor: 'rgb(40, 225, 255)' }}
              >
                <span className="se-blind">#28e1ff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#5bc7ff"
                title="#5bc7ff"
                style={{ backgroundColor: 'rgb(91, 199, 255)' }}
              >
                <span className="se-blind">#5bc7ff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#cd8bc0"
                title="#cd8bc0"
                style={{ backgroundColor: 'rgb(205, 139, 192)' }}
              >
                <span className="se-blind">#cd8bc0</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff97c1"
                title="#ff97c1"
                style={{ backgroundColor: 'rgb(255, 151, 193)' }}
              >
                <span className="se-blind">#ff97c1</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#f7f7f7"
                title="#f7f7f7"
                style={{ backgroundColor: 'rgb(247, 247, 247)' }}
              >
                <span className="se-blind">#f7f7f7</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#555555"
                title="#555555"
                style={{ backgroundColor: 'rgb(85, 85, 85)' }}
              >
                <span className="se-blind">#555555</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff5f45"
                title="#ff5f45"
                style={{ backgroundColor: 'rgb(255, 95, 69)' }}
              >
                <span className="se-blind">#ff5f45</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffa94f"
                title="#ffa94f"
                style={{ backgroundColor: 'rgb(255, 169, 79)' }}
              >
                <span className="se-blind">#ffa94f</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffef34"
                title="#ffef34"
                style={{ backgroundColor: 'rgb(255, 239, 52)' }}
              >
                <span className="se-blind">#ffef34</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#98d36c"
                title="#98d36c"
                style={{ backgroundColor: 'rgb(152, 211, 108)' }}
              >
                <span className="se-blind">#98d36c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00b976"
                title="#00b976"
                style={{ backgroundColor: 'rgb(0, 185, 118)' }}
              >
                <span className="se-blind">#00b976</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00bfb5"
                title="#00bfb5"
                style={{ backgroundColor: 'rgb(0, 191, 181)' }}
              >
                <span className="se-blind">#00bfb5</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00cdff"
                title="#00cdff"
                style={{ backgroundColor: 'rgb(0, 205, 255)' }}
              >
                <span className="se-blind">#00cdff</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#0095e9"
                title="#0095e9"
                style={{ backgroundColor: 'rgb(0, 149, 233)' }}
              >
                <span className="se-blind">#0095e9</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#bc61ab"
                title="#bc61ab"
                style={{ backgroundColor: 'rgb(188, 97, 171)' }}
              >
                <span className="se-blind">#bc61ab</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff65a8"
                title="#ff65a8"
                style={{ backgroundColor: 'rgb(255, 101, 168)' }}
              >
                <span className="se-blind">#ff65a8</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#e2e2e2"
                title="#e2e2e2"
                style={{ backgroundColor: 'rgb(226, 226, 226)' }}
              >
                <span className="se-blind">#e2e2e2</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#333333"
                title="#333333"
                style={{ backgroundColor: 'rgb(51, 51, 51)' }}
              >
                <span className="se-blind">#333333</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff0010"
                title="#ff0010"
                style={{ backgroundColor: 'rgb(255, 0, 16)' }}
              >
                <span className="se-blind">#ff0010</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff9300"
                title="#ff9300"
                style={{ backgroundColor: 'rgb(255, 147, 0)' }}
              >
                <span className="se-blind">#ff9300</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ffd300"
                title="#ffd300"
                style={{ backgroundColor: 'rgb(255, 211, 0)' }}
              >
                <span className="se-blind">#ffd300</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#54b800"
                title="#54b800"
                style={{ backgroundColor: 'rgb(84, 184, 0)' }}
              >
                <span className="se-blind">#54b800</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00a84b"
                title="#00a84b"
                style={{ backgroundColor: 'rgb(0, 168, 75)' }}
              >
                <span className="se-blind">#00a84b</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#009d91"
                title="#009d91"
                style={{ backgroundColor: 'rgb(0, 157, 145)' }}
              >
                <span className="se-blind">#009d91</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00b3f2"
                title="#00b3f2"
                style={{ backgroundColor: 'rgb(0, 179, 242)' }}
              >
                <span className="se-blind">#00b3f2</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#0078cb"
                title="#0078cb"
                style={{ backgroundColor: 'rgb(0, 120, 203)' }}
              >
                <span className="se-blind">#0078cb</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#aa1f91"
                title="#aa1f91"
                style={{ backgroundColor: 'rgb(170, 31, 145)' }}
              >
                <span className="se-blind">#aa1f91</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ff008c"
                title="#ff008c"
                style={{ backgroundColor: 'rgb(255, 0, 140)' }}
              >
                <span className="se-blind">#ff008c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#c2c2c2"
                title="#c2c2c2"
                style={{ backgroundColor: 'rgb(194, 194, 194)' }}
              >
                <span className="se-blind">#c2c2c2</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#141414"
                title="#141414"
                style={{ backgroundColor: 'rgb(20, 20, 20)' }}
              >
                <span className="se-blind">#141414</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ba0000"
                title="#ba0000"
                style={{ backgroundColor: 'rgb(186, 0, 0)' }}
              >
                <span className="se-blind">#ba0000</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#b85c00"
                title="#b85c00"
                style={{ backgroundColor: 'rgb(184, 92, 0)' }}
              >
                <span className="se-blind">#b85c00</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#ac9a00"
                title="#ac9a00"
                style={{ backgroundColor: 'rgb(172, 154, 0)' }}
              >
                <span className="se-blind">#ac9a00</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#36851e"
                title="#36851e"
                style={{ backgroundColor: 'rgb(54, 133, 30)' }}
              >
                <span className="se-blind">#36851e</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#007433"
                title="#007433"
                style={{ backgroundColor: 'rgb(0, 116, 51)' }}
              >
                <span className="se-blind">#007433</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00756a"
                title="#00756a"
                style={{ backgroundColor: 'rgb(0, 117, 106)' }}
              >
                <span className="se-blind">#00756a</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#007aa6"
                title="#007aa6"
                style={{ backgroundColor: 'rgb(0, 122, 166)' }}
              >
                <span className="se-blind">#007aa6</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#004e82"
                title="#004e82"
                style={{ backgroundColor: 'rgb(0, 78, 130)' }}
              >
                <span className="se-blind">#004e82</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#740060"
                title="#740060"
                style={{ backgroundColor: 'rgb(116, 0, 96)' }}
              >
                <span className="se-blind">#740060</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#bb005c"
                title="#bb005c"
                style={{ backgroundColor: 'rgb(187, 0, 92)' }}
              >
                <span className="se-blind">#bb005c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#9c9c9c"
                title="#9c9c9c"
                style={{ backgroundColor: 'rgb(156, 156, 156)' }}
              >
                <span className="se-blind">#9c9c9c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#000000"
                title="#000000"
                style={{ backgroundColor: 'rgb(0, 0, 0)' }}
              >
                <span className="se-blind">#000000</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#700001"
                title="#700001"
                style={{ backgroundColor: 'rgb(112, 0, 1)' }}
              >
                <span className="se-blind">#700001</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#823f00"
                title="#823f00"
                style={{ backgroundColor: 'rgb(130, 63, 0)' }}
              >
                <span className="se-blind">#823f00</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#6a5f00"
                title="#6a5f00"
                style={{ backgroundColor: 'rgb(106, 95, 0)' }}
              >
                <span className="se-blind">#6a5f00</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#245b12"
                title="#245b12"
                style={{ backgroundColor: 'rgb(36, 91, 18)' }}
              >
                <span className="se-blind">#245b12</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#004e22"
                title="#004e22"
                style={{ backgroundColor: 'rgb(0, 78, 34)' }}
              >
                <span className="se-blind">#004e22</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#00554c"
                title="#00554c"
                style={{ backgroundColor: 'rgb(0, 85, 76)' }}
              >
                <span className="se-blind">#00554c</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#004e6a"
                title="#004e6a"
                style={{ backgroundColor: 'rgb(0, 78, 106)' }}
              >
                <span className="se-blind">#004e6a</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#003960"
                title="#003960"
                style={{ backgroundColor: 'rgb(0, 57, 96)' }}
              >
                <span className="se-blind">#003960</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#4f0041"
                title="#4f0041"
                style={{ backgroundColor: 'rgb(79, 0, 65)' }}
              >
                <span className="se-blind">#4f0041</span>
              </button>
            </li>
            <li className={styles.item}>
              <button
                type="button"
                onClick={(e) => setColor((e.nativeEvent.target as any)?.lastChild.innerText)}
                className="se-color-palette"
                color="#830041"
                title="#830041"
                style={{ backgroundColor: 'rgb(131, 0, 65)' }}
              >
                <span className="se-blind">#830041</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ColorLens;
