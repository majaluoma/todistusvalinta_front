const makeRequest = async (method : string, body? : object) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "", {
        method: method,
        headers: { "Content-Type": "application/JSON" },
        body : JSON.stringify(body),
        mode: 'cors'
    })
    return await res.json();
}

export async function post (body : object) : Promise<unknown> {
    return makeRequest ("POST", body);
}