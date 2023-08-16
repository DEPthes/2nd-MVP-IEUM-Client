import ieumAxios from './ieumAxios';

type SendAuthNumberResponse = {
  check: boolean;
  information: {
    message: string;
  };
};

export async function postSendAuthNumber({ email }: { email: string }) {
  return await ieumAxios.post<SendAuthNumberResponse>('/verify/send', {
    email,
  });
}
