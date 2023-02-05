import styles from './loading-component.module.scss';

interface Props {
  loading: boolean;
}

/**
 * 부모의 css의 position 속성은 relative이어야 합니다.
 * @param param0 loading status
 * @returns
 */
const LoadingComponent = ({ loading }: Props) => {
  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <div>로딩중...</div>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
