import { useDataDev } from "../../hooks/useDataDev";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast'

export default function Payment() {
    const amount = Number(localStorage.getItem("finalAmount"));
    const discount = Number(localStorage.getItem("discount"));
    const token = localStorage.getItem("token");
    const { user } = useDataDev(token);
    const userId = localStorage.getItem("userId");

    const [loading, setLoading] = useState(false);

    const baseUrl = "https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: userId,
                    amount: amount,
                    discount: discount,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.removeItem("userId");
                localStorage.removeItem("finalAmount");
                localStorage.removeItem("discount");

                window.location.href = "/scan";
            } else {
                toast.error(data.message || "Terjadi kesalahan");
            }
        } catch (err) {
            console.error(err);
            toast.error("Gagal memproses transaksi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-lg:hidden h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
            <div className="z-10 w-full font-mont max-w-md p-2 rounded-2xl bg-white shadow-xl border border-gray-300">
                <form onSubmit={handleSubmit}>
                    <div className="text-center py-3 flex flex-col">
                        <h1 className="text-3xl font-bold pb-3">Payment</h1>
                        <img src={`${baseUrl}/${user?.qris_payload}`} alt="" className="w-full px-6" />
                        <div className="text-xl font-semibold pt-2">
                            Total pembayaran : {amount.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0
                            })}
                        </div>
                        <div className="w-full flex justify-center pt-2 px-7">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`border w-full px-4 text-xl py-1.5 rounded-lg font-medium 
                                    ${loading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-400 text-white border-green-200"}`}
                            >
                                {loading ? "Memproses..." : "Selesai"}
                            </button>
                        </div>
                    </div>
                </form>
                <Toaster position="top-center" />
            </div>
        </div>
    )
}
