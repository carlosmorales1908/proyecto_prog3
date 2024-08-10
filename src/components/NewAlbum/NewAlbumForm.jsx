import { useContext, useState } from "react";
import ArtistService from "../../services/artist.services";
import ApiSelect from "../Select/ApiSelect";
import { AuthContext } from "../../context/auth.contex";


export default function NewAlbumForm({ handleInputChange, values, errors, showInfoModal, setShowNewArtistModal }) {
    const { token } = useContext(AuthContext);
    const currentYear = new Date().getFullYear();

    //    For Select
    async function getArtistOptions(term) {
        let artistOptions = [];
        if (!term || term.length < 2) {
            return artistOptions;
        }
        try {
            // setIsLoading(true);
            const artistService = new ArtistService(token);
            const response = await artistService.getArtistsByName(term);

            if (response) {
                if (response.results.length > 0) {
                    artistOptions = response.results.map((artist) => ({
                        value: artist.id,
                        label: artist.name,
                    }));
                }
                return artistOptions;
            }
        } catch (error) {
            const child = <p>{error}</p>;
            showInfoModal("Ha ocurrido un error", child);
            console.log("Unexpected error:", error);
        } finally {
            // setIsLoading(false);
        }
    }

    return (
        <>
            <form className="container px-5 row text-start">
                <div className="col-12 text-start">
                    <label htmlFor="title" className="form-label me-3">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control form-control-sm input-color"
                        required
                        value={values.title}
                        onChange={handleInputChange}
                    ></input>
                </div>
                {errors.title && (
                    <div className="text-start">
                        <small className="text-danger">{errors.title}</small>
                    </div>
                )}
                <div className="pt-3 col-12 d-flex align-items-end">
                    <div className="col-7 text-start">
                        <label htmlFor="artist" className="form-label me-2">
                            Artista
                        </label>
                        <div style={{ minWidth: "60%" }}>
                            <ApiSelect
                                id="artist"
                                name="artist"
                                getOptions={getArtistOptions}
                                handleChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-5 text-end">
                        <span
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {setShowNewArtistModal(true)}}
                        >
                            Nuevo artista
                        </span>
                    </div>
                </div>

                {errors.artist && (
                    <div className="text-start">
                        <small className="text-danger">{errors.artist}</small>
                    </div>
                )}
                <div className="pt-3 col-12 text-start">
                    <label htmlFor="year" className="form-label me-4">
                        Año
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        className="form-control form-control-sm  input-color"
                        minLength={4}
                        maxLength={4}
                        min={1700}
                        max={currentYear}
                        value={values.year}
                        onChange={handleInputChange}
                    ></input>
                </div>
            </form>
        </>
    );
}
