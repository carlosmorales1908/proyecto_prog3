import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import UserProfileService from "../../services/profile.services";
import parseEmail from "../../utility/parseEmail";
import "./UserProfile.css";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userProfileService = new UserProfileService(token);
    userProfileService.getProfile().then((profile) => {
      setUserProfile(profile);
      setEmail(profile.email || "");
      setProfileImg(profile.image || "src/assets/sin_perfil.jpeg");
    });
  }, [token]);

  const hanleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="mb-3">USER PROFILE</h1>
      <div className="container card-profile g-0">
        <div className="user-info">
          <div className="header-card d-flex">
            <div>
              <img
                src={profileImg}
                className="header-card-img rounded-circle m-2"
                onClick={handleImageClick}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImg}
              />
            </div>
            <div className="user-name-header d-block mx-5 fs-2 mt-5 fw-bold">
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
