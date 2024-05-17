import { NavLink } from "react-router-dom";
import SidebarHomeIcon from "./icons/sidebar-home.svg";
import SidebarTableIcon from "./icons/sidebar-table.svg";

export function Sidebar() {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <NavLink
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          to="/"
        >
          Progress Bar App
        </NavLink>
        <ul className="mt-6 [&_svg]:w-5 [&_svg]:h-5">
          <li className="relative px-6 py-3">
            <NavLink
              className={({ isActive }) =>
                `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${isActive ? " text-gray-800 dark:text-gray-100" : ""}`
              }
              to="/"
            >
              {({ isActive }) => (
                <>
                  {isActive && <CurrentPageIndicator />}
                  <SidebarHomeIcon />
                  <span className="ml-4">Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="relative px-6 py-3">
            <NavLink
              className={({ isActive }) =>
                `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${isActive ? " text-gray-800 dark:text-gray-100" : ""}`
              }
              to="/users/"
            >
              {({ isActive }) => (
                <>
                  {isActive && <CurrentPageIndicator />}
                  <SidebarTableIcon />
                  <span className="ml-4">User List</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function CurrentPageIndicator() {
  return (
    <span
      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
  );
}
