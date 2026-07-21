import React, { useState, useEffect, useRef } from 'react';
import FormInputWhite from "../../components/ui/FormInputWhite";
import { useLoginDev } from "../../hooks/useLoginDev";

const fields = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password", type: "password" },
];

export default function LoginScan() {
  const { register, handleSubmit, errors, loading, onSubmit, setValue, watch } = useLoginDev();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      window.location.href = "/scan";
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
      <div className="w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
        <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl backdrop-blur-xl shadow-xl border border-gray-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black">Welcome</h1>
            <p className="">Sign in to your merchant account</p>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit(submitHandler)}>
            {fields.map((field) => (
              <FormInputWhite
                key={field.name}
                {...field}
                {...register(field.name)}
                value={field.name === "email" ? emailValue || "" : undefined}
                onInput={field.name === "email" ? handleEmailInput : undefined}
                error={errors[field.name]?.message}
              />
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-2.5 text-lg font-semibold rounded-lg bg-white text-black hover:bg-gray-100 transition border border-gray-300 shadow">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
