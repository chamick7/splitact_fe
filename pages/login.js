import React,{useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "react-google-login";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import {accountAtom} from "../atom";
import getAxios from "../utils/axios";

export default function login() {
  const router = useRouter();
  const {handleSubmit,register,errors} = useForm();
  const [Err, setErr] = React.useState("");
  const [account, setAccount] = useRecoilState(accountAtom);
  const axios = getAxios();



    const responseSuccessGoogle = (res) => {
      const profile = res.profileObj;
      console.log(profile);
    };
    const responseFailGoogle = () => {};

    const getLogin = async (ac) =>{

      console.log(ac);
      await axios.post('/account/login',ac).then(
        res => {
          setAccount({
            email:res.data.account.email,
            name:res.data.account.name,
            role:res.data.account.role,
          });

          router.push('/dashboard');
        }).catch(err=>{
          console.log(err.response);
          setErr('Email or password is incorrect');
        })
    }

    const onSubmit = async (ac) =>{
      await getLogin(ac);
      
    } 

    return (
      <div className="login">
        <section className="login-left">
          <img src="/img/login-img.png" alt="" />
        </section>
        <section className="login-right">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign in to your account</h1>
            {Err && <h6 className="err_msg">{Err}</h6>}
            <div className="login-input email">
              <input
                name="email"
                type="email"
                placeholder="Email"
                ref={register({
                  required: "Required",
                })}
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
  
            {errors.email && <h6 className="err_msg">This is Required</h6>}
            <div className="login-input password">
              <input
                name="password"
                type="password"
                placeholder="Password"
                ref={register({
                  required: "Required",
                })}
              />
              <FontAwesomeIcon icon={faUnlockAlt} />
            </div>
            {errors.password && <h6 className="err_msg">This is Required</h6>}
  
            <button className="login-submit-btn">Sign in</button>
              <h4 className="resetpw">forgot password? <Link href="/resetpassword" ><a>click here</a></Link> </h4>
            <h6 className="middle-line">
              <span>or</span>
            </h6>
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className="google-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    alt="google logo"
                  />
                  Sign in with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <h5>
              Don't have an account? <Link href="/register"><a>Register now</a></Link>{" "}
            </h5>
          </form>
        </section>
      </div>
    );
}
