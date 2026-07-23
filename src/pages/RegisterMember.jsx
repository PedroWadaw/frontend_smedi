import React from "react";
import { Link } from "react-router-dom";
import Galaxy from "../Components/Galaxy";
import SignUpGoogle from "../Components/ui/SignUpGoogle";
import { useRegister } from "../hooks/useRegister";
import FormInput from "../Components/ui/FormInput";

const fields = [
  { name: "nama", placeholder: "Nama" },
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Password", type: "password" },
];

export default function RegisterMember() {
  const { register, handleSubmit, setValue, watch, errors, loading, onSubmit } =
    useRegister();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);
    if (res.success) {
      window.location.href = "/create-profile-member";
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

  console.log("API:", import.meta.env.VITE_API_URL);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-white pb-1">Register Member</h1>
          <p className="text-white/70">Buat akun untuk mendapatkan qr-code</p>
        </div>

        <SignUpGoogle />

        <span className="flex items-center py-4">
          <span className="h-px flex-1 bg-gray-400"></span>
          <span className="shrink-0 px-4 text-gray-100">OR</span>
          <span className="h-px flex-1 bg-gray-400"></span>
        </span>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3.5">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              {...register(field.name)}
              {...field}
              value={field.name === "email" ? emailValue || "" : undefined}
              onInput={field.name === "email" ? handleEmailInput : undefined}
              error={errors[field.name]?.message}
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-300 transition"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-center text-white/70 mt-4 text-md">
          Have an account?
          <Link to="/login" className="ml-1.5 text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}