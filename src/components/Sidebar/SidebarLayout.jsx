import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { PrivateRoutes } from "../../routes/routes";

export default function SidebarLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${PrivateRoutes.HOME}`);
  }, [navigate]);

  return (
    <div className="row g-0">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10 px-4 py-3 text-white">
        <Outlet />
      </div>
    </div>
  );
}
