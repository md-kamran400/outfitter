import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login function executed", formData);
    let responseData;
    await fetch("https://outfitter-backend-sosb.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/formData",
        "content-Type": " application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("singup function executed", formData);
    let responseData;
    await fetch("https://outfitter-backend-sosb.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/formData",
        "content-Type": " application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "signUp" ? (
            <input
              onChange={changeHandler}
              value={formData.username}
              name="username"
              type="text"
              placeholder="Your Name"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            />
          ) : (
            ""
          )}
          <input
            onChange={changeHandler}
            value={formData.email}
            type="email"
            name="email"
            placeholder="Email Address"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            onChange={changeHandler}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>

        <button
          onClick={() => (state === "Login" ? login() : signup())}
          className="btn_dark_rounded my-5 w-full !rounded-md"
        >
          Continue
        </button>
        {state === "signUp" ? (
          <p className="text-black font-bold">
            Already Have an account ?
            <span
              onClick={() => setState("Login")}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-black font-bold">
            Create an account ?
            <span
              onClick={() => setState("signUp")}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p className="text-slate-900/50">
            By continue, i agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
