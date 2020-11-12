import { useEffect } from "react";
import { getAxios }  from "../utils/axios";
import ProtectRoute from "../utils/ProtectRoute";

export default function activity() {
  const axios = getAxios();

//   useEffect(() => {
//     axios
//       .post("/activity",{
//           atName: "Test activity",
//           members: ['5f916088382807330879eb65']
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch(err => {
//           console.log(err.response);
//       });
//   }, []);

  return <ProtectRoute></ProtectRoute>;
}
