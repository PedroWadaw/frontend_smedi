import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Galaxy from '../Components/Galaxy';
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-lg p-8 rounded-2xl bg-white backdrop-blur-xl shadow-xl border border-white/20">
        <div className="flex flex-col items-center mb-5">
          <div className="bg-green-200 p-4 rounded-full">
            <CheckCircle className="size-18 text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Terima Kasih!</h1>
        <p className="text-center text-[17px] font-medium mb-4">Pendaftaran organisasi anda telah berhasil. Silahkan melanjutkan dengan proses pendaftaran member untuk mendapatkan qr-code.</p>

        <button className="w-full p-2.5 text-lg font-medium rounded-lg bg-gray-700 text-white hover:bg-black transition-all">
          <Link to="/register">Lanjut ke Regist Member</Link>
        </button>
      </div>
    </div>
  );
}