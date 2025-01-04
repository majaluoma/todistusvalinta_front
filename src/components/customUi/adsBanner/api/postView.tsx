import { postServer } from '@/lib/apiClient';

/** Registers a adversiement view whith it's ID to the server
 * */
export async function postView(adId: string) {
  const query = {
    id: adId,
  };
  const response = await postServer<string>(query, '/mainoskatseltu');
  return response;
}
