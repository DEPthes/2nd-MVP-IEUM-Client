import ieumAxios from './ieumAxios';

export type EmailCheckResponse = {
  check: boolean;
  information: {
    available: boolean;
  };
};

export async function getEmailDuplicated(email: string) {
  const url = '/auth/email/' + email;
  return await ieumAxios.get<EmailCheckResponse>(url);
}
