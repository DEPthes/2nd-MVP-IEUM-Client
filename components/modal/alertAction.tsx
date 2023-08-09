import { cls } from '@/utils/cls';
import React from 'react';

export type AlertActionStyle = 'primary' | 'tertiary';

export interface AlertActionOptions {
  title: string;
  style: AlertActionStyle;
  handler: (() => void) | null;
}

interface AlertActionProps extends AlertActionOptions {
  closeAlert: () => void;
}

export default function AlertAction({ title, style, handler, closeAlert }: AlertActionProps) {
  const handleClickAction = () => {
    closeAlert();
    if (handler) {
      handler();
    }
  };
  return (
    <button
      className={cls(
        'flex justify-center items-center w-full py-6 rounded-10 font-label--md border-1 border-primary',
        style === 'primary' ? 'bg-primary text-secondary' : 'bg-tertiary text-primary',
      )}
      onClick={handleClickAction}
    >
      {title}
    </button>
  );
}
