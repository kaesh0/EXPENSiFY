const API_URL=import.meta.env.VITE_API_URL;
export async function apiClient(path,options={}) {
    const response=await fetch(`${API_URL}${path}`,{
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options,

    })
    const data=await response.json().catch(()=>null);
    if(!response.ok) throw new Error(data?.message|| "Something went wrong");
    return data;
}