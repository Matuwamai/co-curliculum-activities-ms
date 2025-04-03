import { useState } from "react";
import { sideLinks } from "./data/Links.jsx";
import { Navigate, Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
// import { useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";


export default function DashboardLayout() {
  const [isCollapsed, setCollapsed] = useState(false);

//   const { userInfo } = useSelector((state) => state.user);
const userInfo = { access: true }
  if (userInfo?.access) {
    return (
      <div className='flex h-screen overflow-hidden'>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
        />
        <SideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setCollapsed}
          links={sideLinks}
        />
        <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <TopBar />
          <main>
            {/* Page Content */}
            <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return <Navigate to='/login' />;
}
