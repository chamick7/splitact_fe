import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAxios } from "../../utils/axios";
const axios = getAxios();
import Router from "next/router";
import { accountAtom } from "../../atom";
import { useRecoilState } from "recoil";

import style from "../../css/profile.module.css";

export default function Security({ account }) {
  const { register, handleSubmit, errors } = useForm();
  const [accountData, setAccountData] = useRecoilState(accountAtom)
  const [err, setErr] = useState("");

  const onChangePassword = (data) => {
    setErr("");
    if (data.new_password === data.cf_new_password) {
      axios
        .post("/account/changepassword", {
          old_password: data.old_password,
          new_password: data.new_password,
        })
        .then((result) => {
          setAccountData({});
          Router.replace("/login");
        })
        .catch((err) => {});
    } else {
      setErr("New password not match.");
    }
  };

  return (
    <div className={style.sec_body}>
      <div className={style.sec_container}>
        <h1>Account</h1>
        <div className={style.sec_data}>
          <div className={style.data_item}>
            <h3>Email</h3>
            <div className={style.current}>{account.email}</div>
          </div>
        </div>
        <h1>Security</h1>
        <form className={style.sec_data} onSubmit={handleSubmit(onChangePassword)}>
          {err ? <span style={{ color: "red" }}>{err}</span> : null}
          <div className={style.data_item}>
            <h3>Old password</h3>
            <input
              name="old_password"
              type="password"
              className={style.current}
              ref={register({
                required: "Required",
              })}
            />
          </div>
          <div className={style.data_item}>
            <h3>New password</h3>
            <input
              name="new_password"
              type="password"
              className={style.current}
              ref={register({
                required: "Required",
                minLength: 6,
              })}
            />

            {errors.new_password &&
              errors.new_password.type === "minLength" && (
                <span style={{ color: "red" }}>
                  password must be at least 6 characters
                </span>
              )}
          </div>
          <div className={style.data_item}>
            <h3>Confirm new password</h3>
            <input
              name="cf_new_password"
              type="password"
              className={style.current}
              ref={register({
                required: "Required",
              })}
            />
          </div>
          <button className={style.data_submit}>Update</button>
        </form>
      </div>
    </div>
  );
}
