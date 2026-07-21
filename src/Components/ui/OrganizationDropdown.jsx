import { useState, useRef, useEffect } from "react";

export default function OrganizationDropdown({
  organizations = [],
  value,
  onChange,
  placeholder = "Pilih Organisasi",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = organizations.find((o) => o.id === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full p-3 rounded-lg bg-white/20 text-white outline-none text-left flex justify-between items-center"
      >
        <span>
          {value === null
            ? "Tanpa Organisasi"
            : selected?.nama || placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-gray-200 rounded-lg border border-gray-400 shadow-lg max-h-40 overflow-auto">

          <div
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
            className={`p-3 cursor-pointer font-medium hover:bg-gray-300 ${value === null ? "bg-gray-300" : ""
              }`}
          >
            Tanpa Organisasi
          </div>

          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => {
                onChange(org.id);
                setOpen(false);
              }}
              className={`p-3 cursor-pointer font-medium hover:bg-gray-300 ${value === org.id ? "bg-gray-300" : ""
                }`}
            >
              {org.nama}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}