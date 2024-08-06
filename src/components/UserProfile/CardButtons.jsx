const CardButtons = (props) => {
  return (
    <div className="buttons-container d-flex justify-content-center">
      {props.editMode ? (
        <>
          <button
            type="submit"
            className="btn btn-success mx-2 mb-2"
            onClick={props.handleSaveChanges}
          >
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2 mb-2"
            onClick={props.handleCancelEdit}
          >
            Cancelar
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={props.handleEdit}
        >
          Editar perfil
        </button>
      )}
    </div>
  );
};
export default CardButtons;
