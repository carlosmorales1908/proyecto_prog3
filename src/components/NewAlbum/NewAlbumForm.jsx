import { useContext } from "react";
import ArtistService from "../../services/artist.services";
import ApiSelect from "../Select/ApiSelect";
import { AuthContext } from "../../context/auth.contex";

export default function NewAlbumForm({ handleInputChange, values, errors }) {
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
            console.log("Unexpected error:", error);
        } finally {
            // setIsLoading(false);
        }
    }

    return (
        <form className="container px-5">
            <div className="input-group">
                <label htmlFor="title" className="form-label me-3">
                    Título:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control form-control-sm"
                    required
                    value={values.name}
                    onChange={handleInputChange}
                ></input>
            </div>
            {errors.title && (
                <div className="text-start">
                    <small className="text-danger">{errors.title}</small>
                </div>
            )}
            <div className="input-group pt-3">
                <label htmlFor="artist" className="form-label me-2">
                    Artista:
                </label>
                <div style={{ minWidth: "60%" }}>
                    <ApiSelect
                        id="artist"
                        name="artist"
                        getOptions={getArtistOptions}
                        handleChange={handleInputChange}
                    />
                </div>
            </div>
            {errors.artist && (
                <div className="text-start">
                <small className="text-danger">{errors.artist}</small>
            </div>
            )}
            <div className="input-group pt-3">
                <label htmlFor="year" className="form-label me-4">
                    Año:
                </label>
                <input
                    type="number"
                    id="year"
                    name="year"
                    className="form-control form-control-sm"
                    minLength={4}
                    maxLength={4}
                    min={1700}
                    max={currentYear}
                    value={values.name}
                    onChange={handleInputChange}
                ></input>
            </div>
        </form>
    );
}
