import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  LayoutDashboard,
  User,
  CheckSquare,
  QrCode,
  Store
} from "lucide-react";
import { MenuIcon, LogoutIcon, UserIcon } from "@animateicons/react/lucide";
import SidebarItem from "../../Components/SidebarItem";
import { Link, Outlet } from "react-router-dom";
import { useDashboardAuth } from "../../hooks/useDashboardAuth";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function MainLayout() {
  const token = localStorage.getItem("token");
  const { user, usageData, loading } = useDashboardAuth(token);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const location = useLocation();
  const getTitle = () => {
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/qrcode")) return "Qr-code";
    if (location.pathname.startsWith("/history")) return isMobile ? "History" : "Riwayat Transaksi";
    if (location.pathname.startsWith("/account")) return isMobile ? "Akun" : "Pengaturan Akun";
    // if (location.pathname.startsWith("/merchant")) return isMobile ? "Merchant" : "Daftar Merchant";
    return "";
  };

  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (loading) {
    return <div className="flex h-screen bg-gray-100 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="">
      {/* Desktop */}
      {isDesktop && (
        <div className="max-lg:hidden flex h-screen bg-gray-100 overflow-hidden">
          <div onClick={() => setIsOpen(!isOpen)}
            className={`bg-white border-r border-gray-300 transition-all duration-300 ease-in-out cursor-pointer
        ${isOpen ? "w-60" : "w-19"} overflow-hidden`}
          >
            <div className="py-3.5 pl-2.5 font-mont font-bold text-3xl border-b border-gray-300 whitespace-nowrap flex items-center">
              <img src="https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/logo.png" className="w-12.5 h-11 mr-2 ml-1 shrink-0" alt="" />
              <div className="">{isOpen ? "SMEDI" : ""}</div>
            </div>

            <nav onClick={(e) => e.stopPropagation()} className="mx-1.5 mt-4.5">
              <SidebarItem isOpen={isOpen} icon={LayoutDashboard} label="Dashboard" to="/dashboard" end />
              <SidebarItem isOpen={isOpen} icon={CheckSquare} label="History" to="/history" />
              <SidebarItem isOpen={isOpen} icon={User} label="Account" to="/account" />
            </nav>
          </div>

          <div className="flex-1 flex flex-col min-w-0">

            {/* NAVBAR */}
            <div className="h-18 bg-white w-full shadow flex justify-between items-center px-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1.5 text-xl rounded hover:bg-gray-100 mr-1"
                >
                  <MenuIcon size={29} />
                </button>
                <div className="font-semibold font-mont text-2xl pl-2">{getTitle()}</div>
              </div>

              <div className="flex font-mont items-center gap-x-3">
                <div className="space-y-[-4px]">
                  <div className="text-[19px] font-medium">{user?.nama}</div>
                  {user?.organization && (
                    <div className="text-right">{user?.organization.nama}</div>
                  )}
                </div>
                <Link to="/account">
                  <img src={user?.foto} alt="" className="size-10.5 rounded-full" />
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 border border-gray-400 px-3 pb-1.5 pt-1 text-lg rounded-lg bg-white hover:bg-gray-100"><LogoutIcon size={23} /> Logout</button>
              </div>
            </div>


            <main className="flex-1 py-4 pl-4 pr-8 overflow-auto">
              <Outlet context={{ isOpen, user, usageData }} />
            </main>
          </div>
        </div>
      )}


      {/* Mobile */}
      {isMobile && (
        <div className="lg:hidden font-mont h-screen bg-gray-100 overflow-hidden">

          {/* navbar */}
          <div className="h-19 bg-white w-full shadow flex justify-between items-center px-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1.5 text-xl rounded hover:bg-gray-100 mr-1"
                >
                  <MenuIcon size={33} />
                </button>
                <div className="font-semibold text-2xl">{getTitle()}</div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="space-y-[-4px]">
                  <div className="text-xl font-medium w-20 truncate">{user?.nama.split(" ")[0]}</div>
                  {user?.organization && (
                    <div className="text-right w-20 truncate">{user?.organization.nama.split(" ")[0]}</div>
                  )}
                </div>
                <Link to="/account">
                  <img src={user?.foto} alt="" className="size-11.5 rounded-full" />
                </Link>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-58 z-50 bg-white shadow-lg transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="">
                <div className="flex items-center px-4 py-3.5 border-b border-gray-300 shadow">
                  <img src="https://xguhvxytcmvjqvmianuo.supabase.co/storage/v1/object/public/images/ui/logo.png" alt="" className="w-13.5 h-12" />
                  <div className="font-bold text-2xl pl-2">SMEDI</div>
                </div>
                <nav onClick={() => setIsOpen(false)} className="px-1.5 mt-4.5 border-b border-gray-300 pb-4">
                  <SidebarItem isOpen={isOpen} icon={LayoutDashboard} label="Dashboard" to="/dashboard" end />
                  <SidebarItem isOpen={isOpen} icon={QrCode} label="Qr-code" to="/qrcode" />
                  <SidebarItem isOpen={isOpen} icon={CheckSquare} label="History" to="/history" />
                  <SidebarItem isOpen={isOpen} icon={User} label="Account" to="/account" />
                </nav>
              </div>
              <div className="">
                <div className="pb-4 px-4">
                  <button onClick={handleLogout} className="w-full flex items-center gap-1 border border-gray-400 px-3 pb-1.5 pt-1 text-lg rounded-lg bg-gray-100">
                    <LogoutIcon size={23} /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full bg-gray-100">
            <Outlet context={{ user, usageData }} />
          </div>

        </div>
      )}

    </div>
  );
}