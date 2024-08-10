import { useContext, useState } from "react";
import InfoModal from "../InfoModal/InfoModal";
import { AuthContext } from "../../context/auth.contex";
import useForm from "../../hooks/useForm";
import ArtistService from "../../services/artist.services";
import NewArtistForm from "./NewArtistForm";

export default function NewArtistModal({
    showModal,
    setShowModal,
    showInfoModal,
}) {
    const { token } = useContext(AuthContext);
    //    For Spinner
    const [isLoading, setIsLoading] = useState(false);

    async function createNewArtist() {
        try {
            setIsLoading(true);
            const artistService = new ArtistService(token);
            const response = await artistService.createArtist(values);
            console.log(response);
            if (response.success) {
                showInfoModal("", <p>Artista creado con exito.</p>);
                clearForm();
                setShowModal(false);
            }
            else {
                showInfoModal("Ups...", <p>{response.error}</p>);
                //setShowModal(false);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
            showInfoModal("Ups...", <p>{response.error}</p>);
        } finally {
            setIsLoading(false);
        }
    }

    const initialState = {
        name: "",
        bio: "",
        website: "",
    };

    function validateForm(values) {
        let errors = {};
        !values.name && (errors.name = "Debe escribir un nombre.");
        return errors;
    }

    const { values, errors, handleChange, handleSubmit, clearForm} = useForm(
        initialState,
        createNewArtist,
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
                title="Nuevo artista"
                index={2}
            >
                <NewArtistForm
                    handleInputChange={handleChange}
                    values={values}
                    errors={errors}
                />
            </InfoModal>
        </>
    );
}
