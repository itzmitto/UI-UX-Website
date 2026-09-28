import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useComponentLibrary } from "../../context/ComponentLibraryContext";
import ComponentModal from "../library/ComponentModal";
import Header from "./Header";
import RightToc from "./RightToc";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  const { selectedComponent, closeComponent } = useComponentLibrary();

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <ScrollToTop />

      <Header onOpenMenu={() => setMobileMenuOpen(true)} />

      <div className="mx-auto max-w-[1240px] px-5 pt-[100px]">
        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_158px] xl:gap-9">
          <Sidebar
            mobileOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />

          <main className="min-w-0 py-8">
            <div key={location.pathname} className="page-enter">
              <Outlet />
            </div>
          </main>

          <RightToc />
        </div>
      </div>

      <ComponentModal component={selectedComponent} onClose={closeComponent} />
    </div>
  );
}

export default Layout;
