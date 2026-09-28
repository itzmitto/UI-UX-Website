import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar />

      <main className="pt-16 lg:pl-64">
        <div className="mx-auto max-w-[1240px] px-6 py-10 md:px-10 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
