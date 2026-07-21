import Galaxy from '../Components/Galaxy';
import React, { useEffect, useState } from "react";
import FormInput from "../components/ui/FormInput";
import { useRegisterStepTwo } from "../hooks/useRegisterStepTwo";
import axios from "axios";
import { useRef } from "react";
import { resizeImage } from "../utils/resizeImage";
import cropImage from "../utils/cropImage";
import OrganizationDropdown from "../Components/ui/OrganizationDropdown";
import { useDataAuth } from "../hooks/useDataAuth";
import { useNavigate } from "react-router-dom";
// import "tracking/build/tracking-min.js";
// import "tracking/build/data/face-min.js";

export default function CollectingDataMember() {

  const token = localStorage.getItem("token");
  const { user } = useDataAuth(token);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    loading,
    orgValid,
    checkingOrg,
  } = useRegisterStepTwo();

  const [organizations, setOrganizations] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [detectError, setdetectError] = useState(false);
  const [overSize, setOverSize] = useState(false);
  const [handleImageLoad, setHandleImageLoad] = useState(null);
  const imgRef = useRef(null);
  const baseApiUrl = import.meta.env.VITE_API_URL;

  const selectedOrg = watch("organization_id");

  // const token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.href = "/register";
  //   return;
  // }

  useEffect(() => {
    axios.get(`${baseApiUrl}/organizations`).then((res) => {
      setOrganizations(res.data.data);
    });
  }, []);

  const handleFoto = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setOverSize(true);
      return;
    }

    setOverSize(false);
    const cropped = await cropImage(file);

    const resized = await resizeImage(cropped);

    // const url = URL.createObjectURL(resized);
    // setFile(url);
    // setRawFile(resized);

    setValue("foto", resized);
    setFileUploaded(true);
  };

  // useEffect(() => {
  //   if (imgRef.current && file) {
  //     const tracker = new window.tracking.ObjectTracker("face");
  //     tracker.setInitialScale(4);
  //     tracker.setStepSize(2);
  //     tracker.setEdgesDensity(0.1);

  //     window.tracking.track(imgRef.current, tracker);

  //     tracker.on("track", function (event) {
  //       if (event.data.length > 0) {
  //         setValue("foto", rawFile);
  //         setFileUploaded(true);
  //         setdetectError(false);
  //       } else {
  //         setFileUploaded(false);
  //         setdetectError(true);
  //       }
  //     });
  //   }
  // }, [file]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    try {
      await axios.post(`${baseApiUrl}/auth/complete-profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error completing profile:", err);
    }
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="w-full h-screen fixed top-0 left-0 z-0">
          <Galaxy />
        </div>

        <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-white pb-1">Lengkapi Data</h1>
            <p className="text-white/70">Silakan lengkapi data diri anda</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

            <FormInput {...register("alamat")} placeholder="Alamat" error={errors.alamat?.message} />

            <FormInput {...register("no_telepon")} type="number" placeholder="No Telepon" error={errors.no_telepon?.message} />

            <OrganizationDropdown
              organizations={organizations}
              value={selectedOrg}
              onChange={(val) => {
                setValue("organization_id", val);
              }}
            />

            <div className="w-full">
              {selectedOrg && (
                <div>
                  <input
                    className={`w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border outline-none ${errors.kode_organisasi
                      ? "border-red-500"
                      : orgValid
                        ? "border-green-500"
                        : "border-white/20"
                      }`}
                    placeholder="Kode Organisasi"
                    {...register("kode_organisasi")}
                  />
                </div>
              )}

              {errors.kode_organisasi && (
                <p className="pt-1 text-red-500 text-base font-medium">
                  {errors.kode_organisasi.message}
                </p>
              )}
            </div>

            <div className="w-full">
              {fileUploaded ? (
                <div className="border border-green-500 p-3 rounded-lg bg-white/20 text-white text-center">File diterima</div>)
                : (
                  <label for="File" className="block rounded-lg bg-white/20 text-gray-900 shadow-sm py-3 text-white">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-gray-300"> Upload foto profil </span>

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

                    <input multiple="" type="file" onChange={handleFoto} id="File" className="sr-only" />
                  </label>
                )}

              {overSize && <p className="pt-1 text-red-400 font-medium">File anda terlalu besar (max 5MB). Silahkan pilih file lain.</p>}
            </div>

            {/* {detectError && (
              <p className="text-red-400 font-medium">Wajah kurang terdeteksi, silakan upload ulang.</p>
            )}
              

            {file && (
              <img
                ref={imgRef}
                src={file}
                alt="hidden"
                style={{ visibility: "hidden", position: "absolute", width: "400px", height: "400px" }}
                onLoad={handleImageLoad}
              />
            )} */}

            <button type="submit" disabled={loading || (selectedOrg && orgValid === false) || !fileUploaded} className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-300 transition">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
