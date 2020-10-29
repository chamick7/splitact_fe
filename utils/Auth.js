import getAxios from "../utils/axios";

const axios = getAxios();

export const requirePageAuth = async (res) => {

  const account = await axios
    .get("/account/auth")
    .then((accountRes) => {
      console.log(accountRes);
      return accountRes.data;
    })
    .catch((err) => {
      // console.log(err.response);
    });


    return account;



  
};
