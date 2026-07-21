import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Galaxy from '../Components/Galaxy';
import LoginGoogle from '../Components/ui/LoginGoogle';
import FormInput from "../components/ui/FormInput";
import { useLogin } from "../hooks/useLogin";

const fields = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password", type: "password" },
];

export default function Login() {
  const { register, handleSubmit, errors, loading, onSubmit, setValue, watch } = useLogin();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      window.location.href = "/dashboard";
    }
  };

  const emailValue = watch("email");

  const handleEmailInput = (e) => {
    const input = e.target;
    const pos = input.selectionStart;
    const val = input.value;

    if (val && !val.includes("@")) {
      const newVal = `${val}@gmail.com`;
      setValue("email", newVal);

      setTimeout(() => {
        input.setSelectionRange(pos, pos);
      }, 0);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="w-full h-screen fixed top-0 left-0 z-0">
          <Galaxy />
        </div>

        <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Welcome</h1>
            <p className="text-white/70">Sign in to your account</p>
          </div>

          <LoginGoogle />

          <span class="flex items-center py-4">
            <span class="h-px flex-1 bg-gray-400"></span>
            <span class="shrink-0 px-4 text-gray-100">OR</span>
            <span class="h-px flex-1 bg-gray-400"></span>
          </span>

          <form className="space-y-3.5" onSubmit={handleSubmit(submitHandler)}>
            {fields.map((field) => (
              <FormInput
                key={field.name}
                {...field}
                {...register(field.name)}
                value={field.name === "email" ? emailValue || "" : undefined}
                onInput={field.name === "email" ? handleEmailInput : undefined}
                error={errors[field.name]?.message}
              />
            ))}

            <div className="flex justify-between items-center">
              <label className="flex items-center text-white/70">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button type="button" onClick={() => (window.location.href = '/forget-password')} className="text-white/70 hover:text-white transition">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-200 transition">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center text-white/70 mt-4 text-base">
            Don't have an account?
            <Link to="/register"
              className="ml-2 text-white hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
