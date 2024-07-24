import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function SidebarLayout() {
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
