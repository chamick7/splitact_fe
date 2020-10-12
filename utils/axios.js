import Axios from "axios"



export default function getAxios(){

    if(process.env.NODE_ENV === 'production'){
        return Axios.create({
            baseURL: 'https://api.splitact.com',
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