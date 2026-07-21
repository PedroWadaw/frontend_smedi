import { QRCodeCanvas } from "qrcode.react";
import { DownloadIcon } from "@animateicons/react/lucide";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";

export default function QrCode() {
    const { user } = useOutletContext();
    const qrRef = useRef();

    const downloadQRCode = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector("canvas");
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `QR-Code-${user?.nama || "user"}.png`;
            link.click();
        }
    };

    return (
        <div className="p-4 font-mont w-full lg:hidden">
            <div className="bg-white w-full p-4 rounded-xl shadow">
                <div className="text-xl font-medium">This is your QR Code</div>
                <div ref={qrRef}>
                    <QRCodeCanvas
                        value={user?.qr_string}
                        size={330}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                    />
                </div>
                <div
                    onClick={downloadQRCode}
                    className="flex items-center gap-x-3 hover:underline cursor-pointer w-fit mt-4"
                >
                    <DownloadIcon size={24} />
                    <div className="text-xl font-medium">Download QR-code</div>
                </div>
            </div>
        </div>
    )
}