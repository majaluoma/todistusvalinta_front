import { postServer } from '@/lib/apiClient';


export async function postClick(adId : string) {
  const query = {
    id: adId,
  };
  const response = await postServer<string>(query, "/mainosklikkaus");
  return response;
}
