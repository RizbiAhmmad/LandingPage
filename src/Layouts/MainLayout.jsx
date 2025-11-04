import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const MainLayout = () => {
const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <div>
            {!noHeaderFooter && <Navbar />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
        </div>
    );
};

export default MainLayout;