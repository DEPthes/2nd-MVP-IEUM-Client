import { atom } from 'recoil';

export type AlertActionStyle = 'primary' | 'tertiary';
export type AlertActionOptions = {
  title: string;
  style: AlertActionStyle;
  handler: (() => void) | null;
};
export type AlertOptions = {
  title: string | React.ReactNode;
  actions: AlertActionOptions[];
  closeWithClickBackdrop?: boolean;
};

type AlertStateType = {
  show: boolean;
  alertOptions: AlertOptions;
};

export const initialAlertState: AlertStateType = {
  show: false,
  alertOptions: {
    title: '',
    actions: [],
  },
};

export const alertState = atom({
  key: 'alertState',
  default: initialAlertState,
});
