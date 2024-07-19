import { Link } from "react-router-dom";
function SidebarItem({ text, href, icon }) {
  return (
    <li className="nav-item border-bottom">
      <Link to={href} className="nav-link link-primary">
        {icon && <i className={icon}></i>} {text}
      </Link>
    </li>
  );
}

export default SidebarItem;
