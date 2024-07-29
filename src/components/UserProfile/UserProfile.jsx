import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import UserProfileService from "../../services/profile.services";
import parseEmail from "../../utility/parseEmail";
import "./UserProfile.css";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const hanleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  useEffect(() => {
    const userProfileService = new UserProfileService(token);
    userProfileService.getProfile().then((profile) => {
      setUserProfile(profile);
      setEmail(profile.email || "");
    });
  }, [token]);
  return (
    <>
      <h1 className="mb-3">USER PROFILE</h1>
      <div className="container card-profile g-0">
        <div className="user-info">
          <div className="header-card d-flex">
            <img
              src="src\assets\sin_perfil.jpeg"
              className="rounded-circle m-2"
              style={{ width: "150px", height: "150px" }}
            />
            <div className="user-name-header d-block justify-content-center mx-5 fs-2 mt-3 fw-bold">
              <p>{userProfile.first_name}</p>
            </div>
          </div>
          <div className="body-card m-2">
            <div className="user-name-body fs-5">
              <p className="my-0">Nombre de Usuario:</p>
              <p>{userProfile.username}</p>
            </div>
            <div className="full-name-body fs-5">
              <p className="my-0">Nombre Completo:</p>
              {userProfile.first_name} {userProfile.last_name}
            </div>
            <div className="email-body fs-5 mt-3">
              <p>Correo Electrónico:</p>
              <div className="emial-info d-flex">
                <p>{!showEmail ? parseEmail(email) : email}</p>
                <p
                  onClick={hanleShowEmail}
                  className="text-primary mx-2"
                  style={{ cursor: "pointer" }}
                >
                  Mostrar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
