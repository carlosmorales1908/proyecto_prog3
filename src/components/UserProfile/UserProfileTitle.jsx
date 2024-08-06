import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";

const UserProfileTitle = () => {
  return (
    <div className="d-flex justify-content-between">
      <h1 className="mb-3">Mi Perfil</h1>
      <Link
        className="btn btn-primary fs-5 text-light"
        style={{ height: "40px", padding: "4px" }}
        to={PrivateRoutes.LOGOUT}
      >
        Cerrar Sesión
      </Link>
    </div>
  );
};
export default UserProfileTitle;
