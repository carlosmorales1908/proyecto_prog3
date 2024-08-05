import { Link } from "react-router-dom";
export default function SidebarItem({ text, href, icon=null, img=null}) {
  return (
    <li className={`nav-item  border-dark ${img ? 'border-top mt-auto' : 'border-bottom'}`} >
      <Link to={href} className={`nav-link link-primary ${img && 'bg-black bg-gradient fw-bolder'}`} >
        {icon && <i className={icon}></i>} 
        {img && <img src={img} alt="profile-img" className="header-card-img object-fit-cover rounded-circle mb-1 me-2" style={{width: '30px', height: '30px'}}/>} 
        {text}
      </Link>
    </li>
  );
}

