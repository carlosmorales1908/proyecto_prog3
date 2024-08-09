import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import UserProfileService from "../../services/profile.services";
import parseEmail from "../../utility/parseEmail";
import "./UserProfile.css";
import Spinner from "../Spinner/Spinner";
import CardButtons from "./CardButtons";
import ContentBodyCard from "./ContentBodyCard";
import HeaderCard from "./HeaderCard";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const userProfileService = new UserProfileService(token);
    userProfileService.getProfile().then((profile) => {
      setUserProfile(profile);
      setEmail(profile.email || "");
      setProfileImg(`${import.meta.env.VITE_BASE_URL}${profile.image}` || null);
      setData({
        username: profile.username || "",
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
      });
    });
  }, [token]);

  const handleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  const handleImageClick = () => {
    editMode && fileInputRef.current.click();
  };

  const handleChangeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (userProfile) {
      setData({
        username: userProfile.username,
        firstName: userProfile.first_name,
        lastName: userProfile.last_name,
        email: userProfile.email,
      });
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    imgFile && formData.append("image", imgFile);

    const userProfileService = new UserProfileService(token);

    try {
      const updatedData = await userProfileService.updateProfile(
        userProfile.user__id,
        formData
      );

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        username: updatedData.username,
        first_name: updatedData.first_name,
        last_name: updatedData.last_name,
        email: updatedData.email,
        image: updatedData.image || prevProfile.image,
      }));

      if (updatedData.image) {
        setProfileImg(updatedData.image);
      }
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  if (!userProfile) return <Spinner />;

  return (
    <>
      <div className="container card-profile g-0 mt-2" style={{ width: "60%" }}>
        <div className="user-info">
          <HeaderCard
            userProfile={userProfile}
            profileImg={profileImg}
            fileInputRef={fileInputRef}
            editMode={editMode}
            handleImageClick={handleImageClick}
            handleChangeImg={handleChangeImg}
          />
          <div className="body-card m-2">
            <ContentBodyCard
              title="Nombre de Usuario:"
              name="username"
              profileKey={userProfile.username}
              editMode={editMode}
              dataKey={data.username}
              handleInputChange={handleInputChange}
            />
            <ContentBodyCard
              title="Nombres:"
              name="firstName"
              profileKey={userProfile.first_name}
              editMode={editMode}
              dataKey={data.firstName}
              handleInputChange={handleInputChange}
            />
            <ContentBodyCard
              title="Apellidos:"
              name="lastName"
              profileKey={userProfile.last_name}
              editMode={editMode}
              dataKey={data.lastName}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="email-body mt-3 mb-3 mx-2">
            <p className="fw-bold fs-6">Correo Electrónico:</p>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className="form-control input-color"
              />
            ) : (
              <div className="email-info d-flex">
                <p className="fs-5">{!showEmail ? parseEmail(email) : email}</p>
                <span
                  onClick={handleShowEmail}
                  className="text-primary mx-2 fs-5"
                  style={{ cursor: "pointer" }}
                >
                  {!showEmail ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </span>
              </div>
            )}
          </div>
          <CardButtons
            editMode={editMode}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleSaveChanges={handleSaveChanges}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
