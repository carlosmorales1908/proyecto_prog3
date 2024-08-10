const Spinner = ({ layout = null }) => {
  return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: layout ? "500px" : "auto" }}>
          <div className="spinner-border color-primary" role="status">
              <span className="visually-hidden"></span>
          </div>
      </div>
  );
};

export default Spinner;