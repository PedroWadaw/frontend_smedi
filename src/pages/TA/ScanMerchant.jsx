import { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { toast, Toaster } from 'react-hot-toast'
import { api } from "../../services/api";

export default function ScanMerchant() {
    const [index, setIndex] = useState(0);
    const [showScan, setShowScan] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [scanned, setScanned] = useState(false);
    const videoRef = useRef(null);

    const images = [
        "https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/slide1.png",
        "https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/slide2.png",
        "https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/slide3.png",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let idleTimer;
        const resetTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setShowScan(false);
            }, 60000);
        };

        window.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onkeydown = resetTimer;

        return () => clearTimeout(idleTimer);
    }, []);

    useEffect(() => {
        if (showScan && videoRef.current && !userInfo && !scanned) {
            const codeReader = new BrowserMultiFormatReader();

            (async () => {
                try {
                    const result = await codeReader.decodeOnceFromVideoDevice(
                        null,
                        videoRef.current
                    );

                    if (result) {
                        setScanned(true);
                        const qrString = result.getText();
                        const { data } = await api.post("/scan-member", { qr_string: qrString });

                        setUserInfo(data);
                        localStorage.setItem("userId", data.userId);

                        toast.success("Member valid", { toastId: "scan-success" });

                        setTimeout(() => {
                            window.location.href = "/input";
                        }, 2000);
                    }
                } catch (err) {
                    console.error("QR Error:", err);
                    toast.error("Terjadi kesalahan saat scan", { toastId: "scan-error" });
                }
            })();
        }
    }, [showScan, userInfo, scanned]);


    return (
        <div className="font-mont bg-black text-white h-screen flex items-center justify-center relative overflow-hidden">
            {/* Halaman Slide Show */}
            <div onClick={() => setShowScan(true)}
                className={`absolute w-full h-screen flex flex-col items-center justify-center transition-all duration-700 ${showScan ? "opacity-0 blur-md pointer-events-none" : "opacity-100 blur-0"
                    }`}
            >
                <div className="w-full h-screen overflow-hidden relative bg-gray-800">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {images.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`slide-${i}`}
                                className="w-full h-screen object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Halaman Scan */}
            <div
                className={`absolute w-full h-full flex flex-col items-center justify-center bg-white text-black transition-all duration-700 ${showScan ? "opacity-100 blur-0" : "opacity-0 blur-md pointer-events-none"
                    }`}
            >
                <div className="absolute top-4 left-4 flex items-center">
                    <img src="https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/logo.png" alt="" className="w-14 h-12" />
                    <div className="text-2xl font-semibold">SMEDI</div>
                </div>
                {!userInfo ? (
                    <>
                        <h1 className="text-3xl font-bold mb-3">Arahkan QR-code ke kamera untuk menggunakan SMEDI</h1>
                        <video ref={videoRef} className="w-auto h-2/3 shadow rounded-lg" />
                    </>
                ) : (
                    <div className="text-center text-xl font-medium">
                        <p className="mt-2">Nama: {userInfo.nama}</p>
                        <p>Organisasi: {userInfo?.organisasi || ""}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
