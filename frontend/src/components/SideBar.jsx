import React, { useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { closeSidebar, toggleSidebar } from "../redux/slices/navSlices";
import { useDispatch, useSelector } from "react-redux";
import { CircleX } from "lucide-react";

const SideBar = ({ links }) => {
  const { isCollapsed } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const pathname = useLocation().pathname;

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(closeSidebar());
      } else {
        // Optional: reopen sidebar when resizing to desktop
        // dispatch(openSidebar());
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, pathname]);

  return (
    <>
      <aside
        className={`bg-[#3B82F6] shadow-lg ${isCollapsed ? "w-16" : "w-64"} ${
          isCollapsed ? "z-0" : "fixed z-40"
        } md:relative md:z-0 h-screen overflow-y-auto transition-all duration-300 ease-in-out transform ${
          isCollapsed ? "translate-x-0" : "translate-x-0"
        }`}
        ref={ref}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-white px-4 py-3 flex justify-between items-center border-b border-[#E5E7EB]">
          {!isCollapsed && (
            <h6 className="text-lg font-semibold text-[#3B82F6]">
              Sports Academy
            </h6>
          )}
          <button
            className="p-1 rounded-full hover:bg-[#EFF6FF] text-[#3B82F6] transition-colors"
            onClick={handleSidebar}
          >
            <CircleX size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="px-2 py-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const { id, url, iconClass, title } = link;
              return (
                <li key={id}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 rounded-lg mx-2 transition-colors ${
                        isActive
                          ? "bg-white text-[#3B82F6] font-medium"
                          : "text-white hover:bg-[#2563EB] hover:text-white"
                      } ${isCollapsed ? "justify-center" : ""}`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0">
                        {iconClass({
                          className: isCollapsed ? "w-5 h-5" : "w-5 h-5",
                          color: isCollapsed ? "white" : "inherit",
                        })}
                      </span>
                      {!isCollapsed && <span className="text-sm">{title}</span>}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
