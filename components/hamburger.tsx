import { cls } from '@/utils/cls';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Hamburger({ ...props }: Props) {
  return (
    <div className={cls('flex flex-col items-center gap-10', props.className ?? '')}>
      <div className='w-full h-3 bg-primary rounded-full' />
      <div className='w-full h-3 bg-primary rounded-full' />
    </div>
  );
}
