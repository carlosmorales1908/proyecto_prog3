import { PrivateRoutes } from "../../routes/routes";
import SidebarItem from "./SidebarItem";
export default function Sidebar() {
  return (
    <div className="sidebar sticky-top bg-black vh-100 p-3">
      <h4 className="text-warning">MusicPlayApp</h4>
      <div className="border"></div>
      <ul className="nav flex-column">
        <SidebarItem text=" Inicio" href="/home" icon="bi bi-house" />
        <SidebarItem
          text=" Biblioteca"
          href="/library"
          icon="bi bi-music-note-list"
        />
        {/* <SidebarItem
          text=" Nueva playlist"
          href="/new-playlist"
          icon="bi bi-plus-square"
        /> */}
        {/* HACER UN MODAL */}
        <SidebarItem
          text=" Subir canción"
          href="/upload-song"
          icon="bi bi-cloud-arrow-up"
        />
        <SidebarItem
          text=" Mi perfil"
          href={PrivateRoutes.PROFILE}
          icon="bi bi-person"
        />
      </ul>
    </div>
  );
}
