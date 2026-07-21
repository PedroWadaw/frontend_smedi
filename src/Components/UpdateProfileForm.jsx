import React from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import Galaxy from "./Galaxy";
import FormInput from "./ui/FormInput";
import { toast, Toaster } from "react-hot-toast";
import { resizeImage } from "../utils/resizeImage";
import cropImage from "../utils/cropImage";

export default function UpdateProfileForm({ defaultValues }) {
  const fields = [
    { name: "alamat", placeholder: "Alamat" },
    { name: "no_telepon", placeholder: "No Telepon", type: "number" },
  ];

  const { register, handleSubmit, errors, loading, onSubmit, watch, setValue } =
    useUpdateProfile(defaultValues);

  const foto = watch("foto");
  const preview =
    foto instanceof File ? URL.createObjectURL(foto) : defaultValues?.foto;

  const handleSelectFile = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File terlalu besar. Maksimal 5MB");
      return;
    }

    try {
      const cropped = await cropImage(file);

      const resized = await resizeImage(cropped);

      setValue("foto", resized);
    } catch (err) {
      console.error(err);

      toast.error("Gagal memproses gambar");
    }
  };

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      window.location.href = "/account";
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-white pb-1">Update Profile</h1>
          <p className="text-white/70">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3.5">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              {...register(field.name)}
              error={errors[field.name]?.message}
            />
          ))}

          <div className="flex flex-col w-full justify-center items-center gap-3.5">
            <img src={preview} alt="" className="size-50 object-cover" />

            <label
              for="File"
              className="block w-full rounded-lg bg-white/20 text-gray-900 shadow-sm py-3 text-white"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-gray-300"> Update foto profil </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>
              </div>

              <input
                multiple=""
                type="file"
                accept="image/*"
                id="File"
                onChange={handleSelectFile}
                className="sr-only"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-300 transition"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}