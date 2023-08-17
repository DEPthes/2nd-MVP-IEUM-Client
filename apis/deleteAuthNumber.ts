import ieumAxios from './ieumAxios';

type CheckAuthNumberResponse = {
  check: boolean;
  information: {
    message: string;
  };
};

export async function deleteAuthNumber({ authNumber }: { authNumber: string }) {
  const url = '/verify/check/' + authNumber;
  return await ieumAxios.delete<CheckAuthNumberResponse>(url);
}
