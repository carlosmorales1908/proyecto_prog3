const HeaderCard = (props) => {
  return (
    <div className="header-card d-flex">
      <div>
        <img
          src={
            props.profileImg
              ? `${props.profileImg}`
              : "src/assets/sin_perfil.jpeg"
          }
          className={`header-card-img object-fit-cover rounded-circle m-2 ${
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
      <div className="user-name-header d-block mx-5 mt-5 fw-bold">
        <h2>{props.userProfile.first_name}</h2>
      </div>
    </div>
  );
};
export default HeaderCard;
