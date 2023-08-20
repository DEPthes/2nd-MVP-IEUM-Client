import { getNickname } from '@/apis/getNickname';
import useApiError from '@/hooks/custom/useApiError';

export async function getNicknameFromGPT() {
  try {
    const response = await getNickname();
    return response.data.information.nickname;
  } catch {
    return [];
  }
}
