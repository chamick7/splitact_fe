import Axios from "axios"



export function getAxios(){

    if(process.env.NODE_ENV === 'production'){
        return Axios.create({
            baseURL: 'http://localhost:5000',

            // baseURL: 'https://api.splitact.com',
            withCredentials: true,
            credentials: 'include',
            timeout: 1000
        })

    } else {
        return Axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true,
            credentials: 'include',
            timeout: 1000
        })

    }
}

export function chatAxios(){
    if(process.env.NODE_ENV === 'production'){
        return Axios.create({

            baseURL: 'https://chat.splitact.com',
            withCredentials: true,
            credentials: 'include',
            timeout: 1000
        })

    } else {
        return Axios.create({
            baseURL: 'http://localhost:9000',
            withCredentials: true,
            credentials: 'include',
            timeout: 1000
        })

    }
}