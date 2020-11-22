import React from "react";
import { useForm } from "react-hook-form";

import style from "../../css/profile.module.css";

export default function Security() {
  const { register, handleSubmit } = useForm();

  const onChangePassword = (data) => {
    console.log(data);
  };

  return (
    <div className={style.sec_body}>
      <div className={style.sec_container}>
        <h1>Account</h1>
        <div className={style.sec_data}>
          <div className={style.data_item}>
            <h3>Email</h3>
            <div className={style.current}>person@gmail.com</div>
          </div>
        </div>
        <h1>Security</h1>
        <form onSubmit={handleSubmit(onChangePassword)}>
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
              })}
            />
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
