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
    if (window.innerWidth < 526) {
      dispatch(closeSidebar());
    }
  }, [dispatch, pathname]);

  return (
    <>
      {!isCollapsed && (
        <aside
          className={`bg-blue-400 shadow ${
            isCollapsed ? "w-collapse" : "w-not-collapse"
          } ${
            isCollapsed ? "z-0" : "absolute z-40"
          } md:relative md:z-0 h-screen overflow-y-scroll scrollbar-hide left-0 top-0 transition-all duration-300 ease-in-out`}
          ref={ref}>
          <div className='sticky top-0 bg-slate-50 px-2 flex gap-4'>
            <div className='h-16 flex items-center justify-center text-xl px-4'>
              {!isCollapsed && (
                <h6 className='my-auto uppercase text-blue-400'>
                  Sports Academy
                </h6>
              )}
              <div
                className={`lg:hidden h-8 w-12 flex justify-center items-center cursor-pointer text-blue-400 `}
                onClick={handleSidebar}>
                {!isCollapsed && <CircleX />}
              </div>
            </div>
          </div>
          {/* Sidebar Content */}
          <div className='px-1 pb-4 mb-8 overflow-y-auto'>
            <ul className='mt-4'>
              {links.map((link) => {
                const { id, url, iconClass, title } = link;
                return (
                  <li key={id}>
                    <NavLink
                      to={`${url}`}
                      className={({ isActive }) =>
                        isActive
                          ? `w-full px-3 py-2 my-1 capitalize flex flex-col gap-1${
                              isCollapsed ? "text-xl" : ""
                            } ${
                              link?.subLinks
                                ? "text-white"
                                : "bg-slate-100 rounded"
                            }`
                          : `text-white w-full px-3 py-2 my-1 capitalize ${
                              !isCollapsed &&
                              "hover:bg-slate-100 hover:text-gray-700 hover:rounded"
                            } flex gap-1 items-center ${
                              isCollapsed ? "text-xl" : ""
                            }`
                      }>
                      <div className='flex gap-2 relative'>
                        {iconClass()}
                        {!isCollapsed && <h6 className='my-auto'>{title}</h6>}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
