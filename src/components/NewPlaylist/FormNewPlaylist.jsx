const FormNewPlaylist = ({ handleInputChange, values}) => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre de la playlist:
        </label>
        <input
          className="form-control"
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
          className="form-control"
          id="description"
          name="description"
          value={values.description}
          style={{ resize: "none" }}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default FormNewPlaylist;
