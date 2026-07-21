import React from "react";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import Galaxy from './Galaxy';
import FormInput from "./ui/FormInput";

export default function UpdateAccountForm({ defaultValues }) {

  const fields = [
    { name: "nama", placeholder: "Nama" },
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  const { register, handleSubmit, errors, loading, onSubmit } =
    useUpdateAccount(defaultValues);

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-white pb-1">Update Account</h1>
          <p className="text-white/70">Update your account information</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3.5"
        >
          {fields.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              {...register(field.name)}
              error={errors[field.name]?.message}
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-300 transition"
          >
            {loading ? "Loading..." : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
}