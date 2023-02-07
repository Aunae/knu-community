'use client';
import { useState, useEffect } from 'react';

/**
 * @description enabled 상태로 연결된 특정 부분에서 React.StrictMode의 double checking을 비활성화 해줍니다.
 * @author unknown
 * @link https://github.com/atlassian/react-beautiful-dnd/issues/2396#issuecomment-1248018320
 *
 * How to use:
 * const [enabled] = useStrictDroppable(isYourDataLoading);
 * ...
 * {enabled && <Droppable droppableId={...}> ... </Droppable>}
 */
export const useStrictDroppable = (loading: boolean) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    let animation: any;

    if (!loading) {
      animation = requestAnimationFrame(() => setEnabled(true));
    }

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, [loading]);

  return [enabled];
};
