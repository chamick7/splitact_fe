import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Head from "next/head";

//import css
import "../css/login.css";
import "../css/navbar.css";
import "../css/register.css";

{/* */}



import Navbar from "../Components/Navbar";

function MyApp({ Component, pageProps }) {

  return (
    <RecoilRoot >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Split Act</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
