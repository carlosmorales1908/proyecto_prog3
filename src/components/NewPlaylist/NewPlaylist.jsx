import { useState } from "react";
import InfoModal from "../InfoModal/InfoModal";

const NewPlaylist = () => {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }
  return (
    <>
      <button className="fs-1" onClick={handleOpenModal}>
        +
      </button>
      <InfoModal
        show={showModal}
        setShow={setShowModal}
        handleOpen={handleOpenModal}
        title="Crear una plyalist"
      >
        <p>Soy un modal</p>
      </InfoModal>
    </>
  );
};
export default NewPlaylist;
