import { HTMLAttributes } from 'react';

// type CheckSquareProps = {
//   toggleCheckHandler: () => void;
//   checked: boolean;
// };

interface CheckSquareProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

const CheckSquare = ({ checked, ...props }: CheckSquareProps) => {
  return (
    <button type='button' {...props}>
      <img src={checked ? '/icons/check-square.svg' : '/icons/uncheck-square.svg'} className='w-24 h-24' />
    </button>
  );
};

export default CheckSquare;
