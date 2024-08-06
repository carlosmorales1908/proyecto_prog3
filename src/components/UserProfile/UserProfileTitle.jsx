import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";

const UserProfileTitle = () => {
  return (
    <div className="d-flex justify-content-between">
      <h1 className="mb-3">Mi Perfil</h1>
      <Link to={PrivateRoutes.LOGOUT}>
        <span className="btn btn-sm btn-primary">Cerrar Sesión</span>
      </Link>
    </div>
  );
};
export default UserProfileTitle;
