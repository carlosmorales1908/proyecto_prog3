function SidebarItem({ text, href, icon }) {
  return (
    <li className="nav-item border-bottom">
      <a className="nav-link" href={href}>
      {icon && <i className={icon}></i>} {text}
      </a>
    </li>
  );
}

export default SidebarItem;
