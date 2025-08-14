import { postServer } from '@/lib/apiClient';

/** Registers a adversiement click with it's ID to the server
 * */
export async function postFeedback(email: string, message: string) {
  const query = {
    sahkoposti: email,
    viesti: message,
  };
  const response = await postServer<string>(query, '/palaute');
  return response;
}
