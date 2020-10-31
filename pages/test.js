import Axios from "axios"
import { useEffect } from "react";
import getAxios from "../utils/axios";

const axios = getAxios()

export default function Test({rp} ) {
    

    useEffect(() => {
        console.log(rp);
    }, [])
    return (
        <div>
            
        </div>
    )
}

