import React from "react";
import Galaxy from "../Components/Galaxy";
import FormInput from "../Components/ui/FormInput";
import { useRegisterOrganization } from "../hooks/useRegisterOrganization";

const fields = [
  { name: "nama", placeholder: "Nama Organisasi" },
  { name: "ketua_organisasi", placeholder: "Ketua Organisasi" },
  { name: "no_telepon", type: "number", placeholder: "Nomor Telepon" },
  { name: "jumlah_member", type: "number", placeholder: "Jumlah Anggota" },
  { name: "kode_organisasi", placeholder: "Kode Organisasi" },
];

export default function RegisterOrganization() {
  const { register, handleSubmit, errors, loading, onSubmit } =
    useRegisterOrganization();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      window.location.href = "/success";
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-white pb-1">
            Register Organization
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}