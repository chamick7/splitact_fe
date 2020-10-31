import getAxios from "../utils/axios";

const axios = getAxios();

export const requirePageAuth = async (ctx) => {

  console.log(ctx.req.heades);

  try {
    const cookie = ctx.req?.headers.cookie;

    await axios
      .get("/account/auth", {
        headers: {
          cookie: cookie,
        },
      })
      .then()
      .catch((err) => {
        if (err.response.status === 401) {
          ctx.res.writeHead(302, { Location: "/login" });
          ctx.res.end();
        }
      });
  } catch(err) {

    
  }



  
};
