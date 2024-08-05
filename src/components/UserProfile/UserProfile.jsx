import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import UserProfileService from "../../services/profile.services";
import parseEmail from "../../utility/parseEmail";
import "./UserProfile.css";
import Spinner from "../Spinner/Spinner";

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
      setProfileImg(profile.image || null);
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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}users/profiles/${
          userProfile.user__id
        }/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }

      const updatedData = await response.json();

      setData((prevData) => ({
        ...prevData,
        firstName: updatedData.first_name,
      }));

      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
    fetch(
      `${import.meta.env.VITE_BASE_URL}users/profiles/${userProfile.user__id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );
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
          <div className="header-card d-flex">
            <div>
              <img
                src={
                  profileImg
                    ? `${import.meta.env.VITE_BASE_URL}${userProfile.image}`
                    : "src/assets/sin_perfil.jpeg"
                }
                className={`header-card-img object-fit-cover rounded-circle m-2 ${
                  editMode && "img-edit"
                }`}
                onClick={handleImageClick}
                alt="Profile"
              />
              {editMode && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleChangeImg}
                />
              )}
            </div>
            <div className="user-name-header d-block mx-5 mt-5 fw-bold">
              <h2>{userProfile.first_name}</h2>
            </div>
          </div>
          <div className="body-card m-2">
            <div className="user-name-body">
              <p className="my-1 fw-bold fs-6">Nombre de Usuario:</p>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="fs-5">{userProfile.username}</p>
              )}
            </div>
            <div className="first-name-body">
              <p className="my-1 fw-bold fs-6">Nombres:</p>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="fs-5">{userProfile.first_name}</p>
              )}
            </div>
            <div className="last-name-body">
              <p className="my-1 fw-bold fs-6">Apellidos:</p>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="fs-5">{userProfile.last_name}</p>
              )}
            </div>
            <div className="email-body mt-3 mb-3">
              <p className="fw-bold fs-6">Correo Electrónico:</p>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="email-info d-flex">
                  <p className="fs-5">
                    {!showEmail ? parseEmail(email) : email}
                  </p>
                  <p
                    onClick={handleShowEmail}
                    className="text-primary mx-2 fs-5"
                    style={{ cursor: "pointer" }}
                  >
                    Mostrar
                  </p>
                </div>
              )}
            </div>
            <div className="buttons-container d-flex justify-content-center">
              {editMode ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-success mx-2 fs-5 mb-2"
                    onClick={handleSaveChanges}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2 fs-5 mb-2"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary fs-5 mb-2"
                  onClick={handleEdit}
                >
                  Editar Perfil de Usuario
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
