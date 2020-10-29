import Axios from "axios"
import { useEffect } from "react";
import axios from "axios";




export function getServerSideProps(ctx){


    return{
        props:{

        }
    }
}


export default function test({res,req}) {
    useEffect(() => {

        axios.get('/api/hello').then(logg => {
            // console.log(logg);
        })





    }, [])

    return (
        <div>
            
        </div>
    )
}

