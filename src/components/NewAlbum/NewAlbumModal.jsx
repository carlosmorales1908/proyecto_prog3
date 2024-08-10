import { useContext, useState } from "react";
import InfoModal from "../InfoModal/InfoModal";
import { AuthContext } from "../../context/auth.contex";
import NewAlbumForm from "./NewAlbumForm";
import AlbumService from "../../services/album.services";
import useForm from "../../hooks/useForm";
import NewArtistModal from "../NewArtist/NewArtistModal";

export default function NewAlbumModal({ showModal, setShowModal, showInfoModal }) {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showNewArtistModal, setShowNewArtistModal] = useState(false);
    

    async function createNewAlbum() {        
        try {
            setIsLoading(true);
            const albumService = new AlbumService(token);
            const response = await albumService.createAlbum(values);
            console.log(response);
            if (response.success) {
                showInfoModal("", <p>Album creado con exito.</p>);
                setShowModal(false);
                clearForm();
            }
            else {
                showInfoModal("Ups...", <p>{response.error}</p>);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
            showInfoModal("Error", <p>{error}</p>);
        } finally {
            setIsLoading(false);
        }
    }

    const initialState = {
        title: "",
        artist: "",
        year: "",
    };

    function validateForm(values) {
        let errors = {};
        !values.title && (errors.title = "Debe escribir un nombre.");
        !values.artist &&
            (errors.artist = "Debe seleccionar un artista.");
        return errors;
    }

    const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
        initialState,
        createNewAlbum,
        validateForm
    );

    const handleOpenModal = () => {
        setShowModal(true);
    };


    return (
        <>
            <InfoModal
                show={showModal}
                setShow={setShowModal}
                handleOpen={handleOpenModal}
                handleClickAcept={handleSubmit}
                title="Nuevo Album"
                index={1}
            >
                <NewAlbumForm
                    handleInputChange={handleChange}
                    values={values}
                    errors={errors}
                    showInfoModal={showInfoModal}
                    setShowNewArtistModal={setShowNewArtistModal}
                />
            </InfoModal>
            <NewArtistModal
                showModal={showNewArtistModal}
                setShowModal={setShowNewArtistModal}
                showInfoModal={showInfoModal}
            />
        </>
    );
}
