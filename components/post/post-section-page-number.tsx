'use client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './post-section-page-number.module.scss';

type Props = {
  onClick: (page: number, interval: number) => void;
  currentNumber: number;
  lastNumber: number;
  interval?: number;
  callbackUrl?: string;
  params: any;
};
/**
 * TODO: 버그 수정
 * @param param0 {interval: must be odd number}
 * @returns
 */
const PostSectionPageNumber = ({ onClick, params, currentNumber, lastNumber, interval = 5, callbackUrl = '/home' }: Props) => {
  if (interval % 2 == 0) interval += 1;
  const halfInterval = (interval - 1) / 2;
  const lowerBound = halfInterval + 1;
  const upperBound = lastNumber - lowerBound + 1;
  // if lowerBound === upperBound, no dots are there.
  const [leftPage, setLeftPage] = useState(currentNumber - interval * 2 < 1 ? 1 : currentNumber - interval * 2);
  const [rightPage, setRightPage] = useState(currentNumber + interval * 2 > lastNumber ? lastNumber : currentNumber + interval * 2);
  const leftDots = currentNumber > lowerBound && (
    <span
      onClick={() => {
        onClick(leftPage, interval);
      }}
    >
      <MoreHorizIcon />
    </span>
  );
  const rightDots = currentNumber < upperBound && (
    <span
      onClick={() => {
        onClick(rightPage, interval);
      }}
    >
      <MoreHorizIcon />
    </span>
  );

  const router = useRouter();

  const [numbers, setNumbers] = useState<number[]>([]);
  useEffect(() => {
    console.log(lastNumber);
    var start = currentNumber - halfInterval;
    var end = currentNumber + halfInterval;
    if (interval > lastNumber) {
      start = 1;
      end = lastNumber;
    } else {
      if (start < 1) {
        start += -start + 1;
        end = interval > lastNumber ? lastNumber : interval;
      } else if (end > lastNumber) {
        end = end - (end - lastNumber);
        start = interval > lastNumber ? 1 : lastNumber - interval + 1;
      }
    }
    const n: number[] = [];
    for (let i = start; i <= end; i++) n.push(i);
    setNumbers(n);
  }, [currentNumber, lastNumber, interval]);

  return (
    <div className={styles.container}>
      {leftDots}
      <div>
        {numbers.map((val) =>
          val === currentNumber ? (
            <span
              key={val}
              onClick={() => {
                onClick(val, interval);
              }}
              className={styles.current_number}
            >
              {val}
            </span>
          ) : (
            <span
              key={val}
              onClick={() => {
                onClick(val, interval);
              }}
              className={styles.number}
            >
              {val}
            </span>
          ),
        )}
      </div>
      {rightDots}
    </div>
  );
};

export default PostSectionPageNumber;
