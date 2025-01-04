import { postServer } from '@/lib/apiClient';

/** Registers a adversiement click with it's ID to the server
 * */
export async function postClick(adId: string) {
  const query = {
    id: adId,
  };
  const response = await postServer<string>(query, '/mainosklikkaus');
  return response;
}
