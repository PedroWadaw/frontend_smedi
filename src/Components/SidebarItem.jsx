import { NavLink } from "react-router-dom";

export default function SidebarItem({ isOpen, icon: Icon, label, to, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center mx-1.5 pl-3 h-11.5 gap-3 rounded-md transition-colors
        ${isActive ? "bg-red-500 text-white" : "hover:bg-gray-100"}`
      }
    >
      <Icon className="w-6.5 h-6.5 shrink-0" />
      {isOpen && (
        <span className="text-lg transition-opacity duration-200">
          {label}
        </span>
      )}
    </NavLink>
  );
}