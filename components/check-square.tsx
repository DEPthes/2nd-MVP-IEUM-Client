type CheckSquareProps = {
  toggleCheckHandler: () => void;
  check: boolean;
};

const CheckSquare = (props: CheckSquareProps) => {
  return (
    <button onClick={props.toggleCheckHandler} type='button'>
      <img src={props.check ? '/icons/check-square.svg' : '/icons/uncheck-square.svg'} className='w-24 h-24' />
    </button>
  );
};

export default CheckSquare;
