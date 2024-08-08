import { useContext, useState } from "react";
import InfoModal from "../InfoModal/InfoModal";
import { AuthContext } from "../../context/auth.contex";
import NewSongToPlaylistForm from "./NewSongToPlaylistForm";
import SongService from "../../services/song.services";
import useForm from "../../hooks/useForm";

const NewSongToPlaylistModal = ({ showModal, setShowModal, songId }) => {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    async function addSongToPlaylist() {
        console.log("Adding song to playlist with values:", values);
        console.log("Song ID:", songId);

        try {
            setIsLoading(true);
            const songService = new SongService(token);
            const response = await songService.addSongToPlaylist(songId, values.playlist);
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
        playlist: ""
    };

    function validateForm(values) {
        let errors = {};
        if (!values.playlist) {
            errors.playlist = "Debes elegir una playlist";
        }
        return errors;
    }

    const { values, errors, handleChange, handleSubmit } = useForm(
        initialState,
        addSongToPlaylist,
        validateForm
    );

    return (
        <>
            <InfoModal
                show={showModal}
                setShow={setShowModal}
                title="Playlists"
                handleClickAcept={handleSubmit}
            >
                <NewSongToPlaylistForm
                    handleInputChange={handleChange}
                    values={values}
                    errors={errors}
                />
            </InfoModal>
        </>
    );
}


export default NewSongToPlaylistModal