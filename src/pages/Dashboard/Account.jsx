import { DownloadIcon } from "@animateicons/react/lucide";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";
import FieldAccount from "../../Components/ui/FieldAccount";
import { QRCodeCanvas } from "qrcode.react";
import { LogoutIcon } from "@animateicons/react/lucide";
import { useMediaQuery } from "react-responsive";
import Fade from "../../Components/ui/Fade";

export default function Account() {
  const { user } = useOutletContext();
  const qrRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLow = useMediaQuery({ maxHeight: 800 });

  const fieldAccount = isMobile ? "Update Account" : "Change email or password";
  const fieldData = isMobile ? "Update Data" : "Change your data";

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `QR-Code-${user?.nama || "user"}.png`;
      link.click();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="flex bg-gray-100 max-lg:p-4">
      <div className="flex font-mont w-full bg-white shadow rounded-xl p-5">
        <div className="w-full lg:w-1/2 text-lg flex flex-col gap-y-1">
          <FieldAccount header="Nama" isi={user?.nama} />
          <FieldAccount header="Email" isi={user?.email} />
          <FieldAccount header="Alamat" isi={user?.alamat} />
          <FieldAccount header="No Telepon" isi={user?.no_telepon} />

          <div className="font-medium">Foto Profil</div>
          <img src={user?.foto} className="size-40" alt="" />
          <div className="flex pt-2 justify-between">
            {user?.google_id === null ? (
              <button onClick={() => window.location.href = '/update-account'} className="border border-gray-300 shadow-lg py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer">{fieldAccount}</button>
            ) : null}
            <button onClick={() => window.location.href = '/update-profile'} className="border border-gray-300 shadow-lg py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer">{fieldData}</button>
          </div>
        </div>
        <div className="max-lg:hidden lg:w-1/2 pl-10">
          <div className="text-lg font-medium">This your QR-code</div>
          <div ref={qrRef}>
            <QRCodeCanvas
              value={user?.qr_string}
              size={300}
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
            <DownloadIcon size={20} />
            <div className="text-lg font-medium">Download QR-code</div>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="lg:hidden absolute bottom-8 right-6 flex items-center gap-1 border border-gray-700 px-7 pb-1.5 pt-1 text-lg rounded-lg bg-white">
        <LogoutIcon size={23} /> Logout
      </button>
    </div>
  );
}