const FormNewPlaylist = ({ handleInputChange, values, required }) => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre de la playlist:
        </label>
        <input
          className="form-control input-color"
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción:
        </label>
        <textarea
          className="form-control input-color"
          id="description"
          name="description"
          value={values.description}
          style={{ resize: "none" }}
          onChange={handleInputChange}
        />
      </div>
      {required && (
        <p className="text-warning">Todos los campos son obligatorios</p>
      )}
    </form>
  );
};

export default FormNewPlaylist;
