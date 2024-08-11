const HeaderCard = (props) => {
  return (
    <div className="header-card d-flex justify-content-start align-items-center">
      <div>
        <img
          src={
            props.profileImg
              ? `${props.profileImg}`
              : "/assets/sin_perfil.jpeg"
          }
          className={`header-card-img object-fit-cover rounded-circle m-2 mx-3 ${
            props.editMode && "img-edit"
          }`}
          onClick={props.handleImageClick}
          alt="Profile"
        />
        {props.editMode && (
          <input
            ref={props.fileInputRef}
            type="file"
            accept="image/*"
            className="d-none"
            onChange={props.handleChangeImg}
          />
        )}
      </div>
      <div className="user-name-header d-block fw-bold ms-3">
        <h2>{props.userProfile.first_name}</h2>
      </div>
    </div>
  );
};
export default HeaderCard;
