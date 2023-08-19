import { HTMLAttributes } from 'react';

import CheckIcon from '../public/icons/check.svg';
import SquareIcon from '../public/icons/square.svg';

interface CheckSquareProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

const CheckSquare = ({ checked, ...props }: CheckSquareProps) => {
  return (
    <button type='button' {...props}>
      <div className='relative flex'>
        <SquareIcon className='w-24 h-24' />
        {checked && <CheckIcon className='absolute top-7 left-6' />}
      </div>
    </button>
  );
};

export default CheckSquare;
