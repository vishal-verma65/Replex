import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const register = async({email, username, password})=>{
    const response = await api.post("/auth/register", {username, email, password})
    return response.data
}

export const login = async({email, password})=>{
    const response = await api.post("/auth/login", {email, password})
    return response.data
}

export const getMe = async()=>{
    const response = await api.get("/auth/get-me")
    return response.data
}