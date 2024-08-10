const ContentBodyCard = (props) => {
  return (
    <div className="user-name-body">
      <p className="my-1 fw-bold fs-6">{props.title}</p>
      {props.editMode ? (
        <input
          type="text"
          name={props.name}
          value={props.dataKey}
          onChange={props.handleInputChange}
          className="form-control input-color"
        />
      ) : (
        <p className="fs-5">{props.profileKey}</p>
      )}
    </div>
  );
};
export default ContentBodyCard;
