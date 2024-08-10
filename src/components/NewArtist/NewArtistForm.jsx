
export default function NewArtistForm({ handleInputChange, values, errors }) {

    return (
        <form className="container px-5 text-start row">
            <div className="col-12">
                <label htmlFor="name" className="form-label me-3">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-sm input-color"
                    required
                    value={values.name}
                    onChange={handleInputChange}
                ></input>
            </div>
            {errors.name && (
                <div className="text-start">
                    <small className="text-danger">{errors.name}</small>
                </div>
            )}
            <div className="col-12 pt-3">
                <label htmlFor="bio" className="form-label me-3">
                    Biografia
                </label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    className="form-control form-control-sm input-color"
                    value={values.bio}
                    onChange={handleInputChange}
                ></input>
            </div>
            <div className="col-12  pt-3">
                <label htmlFor="website" className="form-label me-3">
                    Sitio web
                </label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    className="form-control form-control-sm input-color"
                    value={values.website}
                    onChange={handleInputChange}
                ></input>
            </div>
        </form>
    );
}
