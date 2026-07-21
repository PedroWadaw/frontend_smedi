import { useDataDev } from "../../hooks/useDataDev";
import { useState } from "react";

export default function InputNominal() {
    const token = localStorage.getItem("token");
    const { user } = useDataDev(token);
    const [nominal, setNominal] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const amount = parseFloat(nominal);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Nominal tidak valid");
            return;
        }

        const discountRate = user.discount;
        const discount = user.type === "percentage" ? (amount * discountRate)/100 : discountRate;
        const finalAmount = amount - discount;

        localStorage.setItem("finalAmount", finalAmount);
        localStorage.setItem("discount", discount);
        window.location.href = "/payment";
    };

    return (
        <div className="w-full max-lg:hidden h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
            <div className="z-10 w-full font-mont max-w-sm lg:max-w-lg p-4 lg:p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-gray-300">
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <h1 className="text-[23px] lg:text-3xl font-bold">Input Nominal Pembelian</h1>
                        <div className="px-5 pt-3 gap-y-3 flex flex-col">
                            <input value={nominal}
                                onChange={(e) => setNominal(e.target.value)}
                                required type="number" placeholder="Nominal" className="w-full border border-gray-300 shadow rounded-lg py-2 px-3 placeholder:text-lg placeholder:font-medium outline-none" />
                            <button className="border border-gray-300 shadow rounded-lg py-2 w-full bg-green-400 text-white text-xl font-semibold">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}