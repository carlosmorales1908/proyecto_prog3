import { PrivateRoutes } from "../../routes/routes";
import SidebarItem from "./SidebarItem";

export default function Sidebar({profile}) {  
  return (
    <div className="sidebar d-flex flex-column sticky-top bg-black vh-100 p-0 border-end border-dark">
      <div className="ps-3 bg-black bg-gradient pt-3 pb-2">
        <div>
          <img src="/assets/letras2.png" alt="logo" style={{width: "200px", height:"55px"}} />
        </div>

      </div>
      <div className="border border-dark"></div>
      <ul className="nav flex-column flex-grow-1">
        <SidebarItem text=" Inicio" href="/home" icon="bi bi-house" />
        <SidebarItem
          text=" Biblioteca"
          href="/library"
          icon="bi bi-music-note-list"
        />
        <SidebarItem
          text=" Subir canción"
          href="/upload-song"
          icon="bi bi-cloud-arrow-up"
        />
        <SidebarItem
          text={` ${profile.firstName && profile.firstName.split(' ')[0]}`}
          href={PrivateRoutes.PROFILE}
          img={`${import.meta.env.VITE_BASE_URL}${profile.image}`}
        />
      </ul>
    </div>
  );
}
