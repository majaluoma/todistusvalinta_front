type GraphqlData<T> = {
  data: T;
};

const makeRequest = async (
  method: string,
  url: string,
  stringType: boolean,
  body?: object,
) => {
  const res = await fetch(url + '', {
    method: method,
    headers: {
      'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(body),
    mode: 'cors',
  });
  if (stringType) {
    return res.text();
  } else {
    return await res.json();
  }
};

export async function postApi<T>(body: object): Promise<GraphqlData<T>> {
  return makeRequest(
    'POST',
    import.meta.env.VITE_API_URL,
    false,
    body,
  ) as Promise<GraphqlData<T>>;
}

export async function postServer<T>(
  body: object,
  path: string,
): Promise<GraphqlData<T>> {
  return makeRequest(
    'POST',
    import.meta.env.VITE_SERVER_URL + path,
    true,
    body,
  ) as Promise<GraphqlData<T>>;
}
