import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import UserProfileService from "../../services/profile.services";
import parseEmail from "../../utility/parseEmail";

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
      <h1>USER PROFILE</h1>
      <div className="container">
        <div className="user-info">
          <img
            src="src\assets\sin_perfil.jpeg"
            className="rounded-circle"
            style={{ width: "200px", height: "200px" }}
          />
          <p>Nombre de Usuario:</p>
          <p>{userProfile.username}</p>
          <p>Nombre Completo:</p>
          {userProfile.first_name} {userProfile.last_name}
          <p>Correo Electrónico:</p>
          <p>{!showEmail ? parseEmail(email) : email}</p>
          <p
            onClick={hanleShowEmail}
            className="text-primary"
            style={{ cursor: "pointer" }}
          >
            Mostrar Email
          </p>
        </div>
      </div>
    </>
  );
};
export default UserProfile;

/*
user__id
username
first_name
last_name
email
dob
bio
image: null
state: null
created_at: not necesary
updated_at: not necesary
*/
