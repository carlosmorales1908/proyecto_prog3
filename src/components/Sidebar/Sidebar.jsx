import SidebarItem from './SidebarItem'
export default function Sidebar() {
  return (
    <div className="sidebar p-3">
      <h4 className="text-warning">MusicPlayApp</h4>
      <div className="border"></div>
      <ul className="nav flex-column">
        <SidebarItem text=" Inicio" href="#" icon="bi bi-house" />
        <SidebarItem text=" Buscar" href="#" icon="bi bi-search"/>
        <SidebarItem text=" Mi biblioteca" href="#" icon="bi bi-music-note-list"/>
        <SidebarItem text=" Nueva playlist" href="#" icon="bi bi-plus-square"/>
        <SidebarItem text=" Subir canción" href="#" icon="bi bi-cloud-arrow-up"/>
        <SidebarItem text=" Mi cuenta" href="#" icon="bi bi-person"/>
      </ul>
    </div>
  );
}
