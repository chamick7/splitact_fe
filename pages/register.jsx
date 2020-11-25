import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "react-google-login";
import { useForm } from "react-hook-form";
import { getAxios } from "../utils/axios";
import PreventRoute from "../utils/PreventRoute";
import Loader from "../Components/Loader";
import { useRecoilState } from "recoil";
import { accountAtom } from "../atom";

export default function Register() {
  const { handleSubmit, register, errors, watch } = useForm();
  const router = useRouter();
  const [email, setEmail] = useState(router.query.email);
  const axios = getAxios();
  const [account, setAccount] = useRecoilState(accountAtom);

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const responseGoogle = (res) => {
    const tokenId = res.tokenId;

    axios
      .post("/account/google", {
        tokenId,
      })
      .then((res) => {
        setAccount({
          email: res.data.account.email,
          username: res.data.account.username,
          acID: res.data.account.acID,
          role: res.data.account.role,
          img: res.data.account.img,
        });

        router.push("/dashboard");
      })
      .catch((err) => {});
  };

  const onSubmit = (account) => {
    setLoader(true);
    axios
      .post("/account", account)
      .then((res) => {
        setLoader(false);

        setError("");
        if (res.data.status === "Success") {
          router.push({ pathname: "/login" });
        }
      })
      .catch((err) => {
        setLoader(false);

        if (err.response.status == 409) {
          if (err.response.data.already) {
            if (err.response.data.already === "email") {
              setError("This email address is already registered");
            } else if (err.response.data.already === "username") {
              setError("This username is already registered");
            }
          }
        }
      });
  };

  return (
    <PreventRoute>
      <div className="login">
        <section className="login-left">
          <img src="/img/register-img.png" alt="" />
        </section>
        <section className="login-right">
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {loader && <Loader />}
            <h1>Register a new account</h1>
            {errors.termOfUse && errors.termOfUse.type === "required" && (
              <h6 className="err_msg">Please accept term of use</h6>
            )}
            {error && <h6 className="err_msg">{error}</h6>}
            <div className="login-input name">
              <input
                name="username"
                type="text"
                placeholder="Username"
                ref={register({
                  required: "Required",
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            {errors.username && errors.username.type === "required" && (
              <h6 className="err_msg">This is Required</h6>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <h6 className="err_msg">This field required min length 6</h6>
            )}
            {errors.username && errors.username.type === "maxLength" && (
              <h6 className="err_msg">This field max length is 12 </h6>
            )}

            <div className="login-input email">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email || ""}
                onChange={handleChangeEmail}
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
                  minLength: 6,
                })}
              />
              <FontAwesomeIcon icon={faUnlockAlt} />
            </div>
            {errors.password && errors.password.type === "required" && (
              <h6 className="err_msg">This is Required</h6>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <h6 className="err_msg">This field required min length 6</h6>
            )}

            <div className="login-input cf_password">
              <input
                name="cf_password"
                type="password"
                placeholder="Confirm password"
                ref={register({
                  required: "Required",
                  minLength: 6,
                  validate: (value) => value === watch("password"),
                })}
              />
              <FontAwesomeIcon icon={faUnlockAlt} />
            </div>
            {errors.cf_password && errors.cf_password.type === "required" && (
              <h6 className="err_msg">This is Required</h6>
            )}
            {errors.cf_password && errors.cf_password.type === "minLength" && (
              <h6 className="err_msg">This field required min length 6</h6>
            )}
            {errors.cf_password && errors.cf_password.type === "validate" && (
              <h6 className="err_msg">Passwords not match</h6>
            )}

            <label className="register_agree noselect" htmlFor="tou">
              <input
                type="checkbox"
                name="termOfUse"
                id="tou"
                ref={register({
                  required: "Required",
                })}
              />
              I agree to the Splitact{" "}
              <Link href="/term_of_use">
                <a>term of use</a>
              </Link>
            </label>

            <button className="login-submit-btn">Register</button>

            <h6 className="middle-line">
              <span>or</span>
            </h6>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT}
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
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <h5>
              Already have an account?{" "}
              <Link href="/login">
                <a>Sign in now</a>
              </Link>
            </h5>
          </form>
        </section>
      </div>
    </PreventRoute>
  );
}
