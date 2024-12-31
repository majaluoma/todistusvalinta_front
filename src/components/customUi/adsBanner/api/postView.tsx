import { postServer } from '@/lib/apiClient';


export async function postView(adId : string) {
  const query = {
    id: adId,
  };
  const response = await postServer<string>(query, "/mainoskatseltu");
  return response;
}