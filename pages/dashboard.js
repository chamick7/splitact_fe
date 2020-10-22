

import { requirePageAuth } from "../utils/Auth";
import Calendar from "../Components/Calendar";

export const getServerSideProps = ({req,res}) => {
    requirePageAuth(res)


    return {
        props:{
            
        }
    }
}

import styles from "../css/dashboard.module.css";



export default function dashboard() {

    return (
        <>
           <Calendar />
           <div style={{height:2000}}>

           </div>
        </>
    )
}
