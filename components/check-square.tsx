import { HTMLAttributes } from 'react';

import CheckSquareIcon from '../public/icons/check-square.svg';
import UnCheckSquareIcon from '../public/icons/uncheck-square.svg';

interface CheckSquareProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

const CheckSquare = ({ checked, ...props }: CheckSquareProps) => {
  return (
    <button type='button' {...props}>
      {checked ? <CheckSquareIcon className='w-24 h-24' /> : <UnCheckSquareIcon className='w-24 h-24' />}
    </button>
  );
};

export default CheckSquare;
