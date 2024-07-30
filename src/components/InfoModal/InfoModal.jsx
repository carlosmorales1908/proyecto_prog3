export default function InfoModal({ show, setShow, title, children }) {
  function handleClose() {
    setShow(false);
  }
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      aria-labelledby="infoModal"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark bg-gradient">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="infoModal">
              {title}
            </h1>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
          </div>
          <div className="modal-body text-center">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Cerrar
            </button>
            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
