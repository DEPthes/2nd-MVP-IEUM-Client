import { AlertActionOptions } from '@/components/modal/alertAction';
import { atom } from 'recoil';

export type AlertOptions = {
  title: string;
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
