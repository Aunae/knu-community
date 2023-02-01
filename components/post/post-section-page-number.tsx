'use client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './post-section-page-number.module.scss';

type Props = {
  currentNumber: number;
  lastNumber: number;
  interval?: number;
  callbackUrl?: string;
  params: any;
};
/**
 *
 * @param param0 {interval: must be odd number}
 * @returns
 */
const PostSectionPageNumber = ({ params, currentNumber, lastNumber, interval = 5, callbackUrl = '/home' }: Props) => {
  if (interval > lastNumber) interval = lastNumber;
  if (interval % 2 == 0) interval += 1;
  const halfInterval = (interval - 1) / 2;
  const lowerBound = halfInterval + 1;
  const upperBound = lastNumber - lowerBound + 1;
  // if lowerBound === upperBound, no dots are there.
  const [leftPage, setLeftPage] = useState(currentNumber - interval * 2 < 1 ? 1 : currentNumber - interval * 2);
  const [rightPage, setRightPage] = useState(currentNumber + interval * 2 > lastNumber ? lastNumber : currentNumber + interval * 2);
  const leftDots = currentNumber > lowerBound && (
    <Link href={`${callbackUrl}?page${leftPage}&interval${interval}`}>
      <MoreHorizIcon />
    </Link>
  );
  const rightDots = currentNumber < upperBound && (
    <Link href={`${callbackUrl}?page${rightPage}&interval${interval}`}>
      <MoreHorizIcon />
    </Link>
  );

  const [numbers, setNumbers] = useState<number[]>([]);
  useEffect(() => {
    console.log('asd');
    var start = currentNumber - halfInterval;
    var end = currentNumber + halfInterval;
    if (start < 1) {
      start += -start + 1;
      end = interval;
    } else if (end > lastNumber) {
      end = end - (end - lastNumber);
      start = lastNumber - interval + 1;
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
            <Link key={val} href={`${callbackUrl}?page=${val}&interval=${interval}`} className={styles.current_number}>
              {val}
            </Link>
          ) : (
            <Link key={val} href={`${callbackUrl}?page=${val}&interval=${interval}`} className={styles.number}>
              {val}
            </Link>
          ),
        )}
      </div>
      {rightDots}
    </div>
  );
};

export default PostSectionPageNumber;
