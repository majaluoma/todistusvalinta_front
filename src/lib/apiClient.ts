const makeRequest = async (path : string, method : string, body? : JSON) => {
    const res = await fetch(process.env.VITE_API_URL + path, {
        method: method,
        body : JSON.stringify(body)
    })
    return await res.json();
}


export async function get (path : string) : Promise<unknown> {
    return makeRequest (path, "GET");
}