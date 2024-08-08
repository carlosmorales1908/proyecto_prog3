import { useContext, useState } from "react";
import InfoModal from "../InfoModal/InfoModal";
import { AuthContext } from "../../context/auth.contex";
import NewAlbumForm from "./NewAlbumForm";
import AlbumService from "../../services/album.services";
import useForm from "../../hooks/useForm";

export default function NewAlbumModal({ showModal, setShowModal }) {
    const { token } = useContext(AuthContext);
    //    For Spinner
    const [isLoading, setIsLoading] = useState(false);

    async function createNewAlbum() {        
        try {
            setIsLoading(true);
            const albumService = new AlbumService(token);
            const response = await albumService.createAlbum(values);
            console.log(response);
            if (response) {
                setShowModal(false);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
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

    const { values, errors, handleChange, handleSubmit } = useForm(
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
            >
                <NewAlbumForm
                    handleInputChange={handleChange}
                    values={values}
                    errors={errors}
                ></NewAlbumForm>
            </InfoModal>
        </>
    );
}
