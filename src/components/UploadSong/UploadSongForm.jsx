import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import useForm from "../../hooks/useForm";
import SongService from "../../services/song.services";
import AlbumService from "../../services/album.services";
import InfoModal from "../InfoModal/InfoModal";
import Spinner from "../Spinner/Spinner";
import ApiSelect from "../Select/ApiSelect";

export default function UploadSongForm() {
    const { token } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    //    For Spinner
    const [isLoading, setIsLoading] = useState(false);
    //    For Modal
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");

    //    For Select
    async function getAlbumOptions(term) {
        if (!term || term.length < 2) {
            return [];
        }
        
        try {
            // setIsLoading(true);
            const albumService = new AlbumService(token);
            const response = await albumService.getAlbumsByTitle(term);

            if (response) {
                let albumOptions;
                if (response.results.length > 0) {
                    albumOptions = response.results.map((album) => ({
                        value: album.id,
                        label: album.title,
                    }));
                }
                return albumOptions;
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        } finally {
            // setIsLoading(false);
        }
    }

    //    For Modal
    function handleOpenModal() {
        setShowModal(true);
    }

    //    For useForm
    const initialState = {
        title: "",
        year: "",
        duration: "",
        album: "",
        song_file: null,
    };

    async function handleUploadSong() {
        try {
            setIsLoading(true);
            const songService = new SongService(token);
            const response = await songService.addSong(values);

            if (response.success) {
                console.log("Success:", response.data);
                setModalTitle("Listo");
                setModalText("La canción ha sido subida correctamente.");
                handleOpenModal();
                setIsLoading(false);
                clearForm();
            } else {
                setModalTitle("Error");
                setModalText(response.error);
                handleOpenModal();
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function validateSongForm(values) {
        let errors = {};
        !values.title && (errors.title = "Debe escribir un título.");
        !values.song_file &&
            (errors.song_file = "Debe seleccionar un archivo de audio.");
        return errors;
    }

    const { values, errors, handleChange, handleSubmit } = useForm(
        initialState,
        handleUploadSong,
        validateSongForm
    );

    function clearForm() {
        fileInputRef.current.value = null;
        Object.keys(values).forEach((key) => {
            if (key == "song_file") {
                values[key] = null;
            } else {
                values[key] = "";
            }
        });
    }

    //    UploadSongForm
    return (
        <>
            <InfoModal
                show={showModal}
                setShow={setShowModal}
                handleOpen={handleOpenModal}
                title={modalTitle}
            >
                <p>{modalText}</p>
            </InfoModal>
            <h1 className="mb-4">Subir Canción</h1>
            <div className="d-flex justify-content-center pt-5">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="text-primary px-5 py-4 w-50 border rounded bg-dark bg-gradient needs-validation"
                    noValidate
                >
                    <div className="input-group col-12">
                        {/* <label htmlFor="title" className="me-2 mb-3">
              Título:
            </label> */}
                        <span
                            className="input-group-text bg-black bg-gradient text-primary"
                            id="inputGroup-sizing-default"
                        >
                            Título
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            minLength={1}
                            maxLength={255}
                            required
                            value={values.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {errors.title && (
                        <small className="text-danger">{errors.title}</small>
                    )}
                    <div className="input-group mt-3">
                        {/* <label htmlFor="year" className="me-2 mb-3">Año de lanzamiento:</label> */}
                        <span
                            className="input-group-text bg-black bg-gradient text-primary"
                            id="inputGroup-sizing-default"
                        >
                            Año de lanzamiento
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            id="year"
                            name="year"
                            minLength={-2147483648}
                            maxLength={2147483647}
                            value={values.year}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="input-group mt-3">
                        {/* <label htmlFor="duration" className="me-2 mb-3">Duración (segundos):</label> */}
                        <span
                            className="input-group-text bg-black bg-gradient text-primary"
                            id="inputGroup-sizing-default"
                        >
                            Duración (segundos)
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            id="duration"
                            name="duration"
                            minLength={1}
                            maxLength={2147483647}
                            value={values.duration}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="input-group mt-3">
                        <span
                            className="input-group-text bg-black bg-gradient text-primary"
                            id="inputGroup-sizing-default"
                        >
                            Album
                        </span>
                        <div style={{ minWidth: "85%" }}>
                            <ApiSelect id='album' name='album' getOptions={getAlbumOptions} handleChange={handleChange} />
                        </div>
                    </div>
                    <div className="input-group mt-3">
                        {/* <label htmlFor="audio" className="me-2">Archivo de audio:</label> */}
                        {/* <br /> */}
                        <div className="input-group">
                            <input
                                type="file"
                                className="form-control"
                                id="song_file"
                                name="song_file"
                                accept="audio/*"
                                aria-describedby="audio"
                                aria-label="Upload"
                                required
                                ref={fileInputRef}
                                // value={values.song_file}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: "song_file",
                                            value: e.target.files[0],
                                        },
                                    })
                                }
                            />
                        </div>
                        {errors.song_file && (
                            <small className="text-danger mb-3">
                                {errors.song_file}
                            </small>
                        )}
                    </div>
                    {/* {fetchError&&(<div className="text-center text-danger mt-3">{fetchError}</div>)} */}

                    <div className="text-center">
                        {isLoading ? (
                            <div className="mt-4 px-4">
                                <Spinner />
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-success mt-4 px-4"
                            >
                                Enviar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
