import { useContext, useState } from "react";
import InfoModal from "../InfoModal/InfoModal";
import FormNewPlaylist from "./FormNewPlaylist";
import PlaylistService from "../../services/playlists.services";
import { AuthContext } from "../../context/auth.contex";

const NewPlaylist = () => {
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [required, setRequired] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClickAccept = async (e) => {
    e.preventDefault();
    const playlistService = new PlaylistService(token);
    try {
      if (!data.name || !data.description) {
        setRequired(true)
      } else {
        playlistService.createPlaylist(data);
        setShowModal(false);
        setData({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Error Creando la  playlist:", error);
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleOpenModal}>
        Nueva Playlist
      </button>
      <InfoModal
        show={showModal}
        setShow={setShowModal}
        handleOpen={handleOpenModal}
        handleClickAcept={handleClickAccept}
        title="Nueva Playlist"
      >
        <FormNewPlaylist handleInputChange={handleInputChange} values={data} required={required}/>
      </InfoModal>
    </>
  );
};

export default NewPlaylist;
