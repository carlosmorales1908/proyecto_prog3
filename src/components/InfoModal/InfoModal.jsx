export default function InfoModal({ show, setShow, title, handleClickAcept=null, children, index=null}) {  
  function handleClose() {
    setShow(false);
  }
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""} ${index && `z-${index} position-absolute`}`}
      tabIndex="-1"
      aria-labelledby="infoModal"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered text-white">
        <div className="modal-content bg-dark bg-gradient">
          <div className="modal-header py-2">
            <h5 className="modal-title" id="titleModal">
              {title}
            </h5>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
          </div>
          <div className="modal-body text-center">{children}</div>
          <div className={`modal-footer py-2 ${handleClickAcept? 'justify-content-between' : 'justify-content-center'}`}>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Cerrar
            </button>
            {handleClickAcept && <button type="button" onClick={handleClickAcept} className="btn btn-success">Aceptar</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
