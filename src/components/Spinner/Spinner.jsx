const Spinner = ({ layout = null }) => {
  return (
      <div className="d-flex justify-content-center align-items-center"   style= {layout? {} : { minHeight: "500px" }}>
          <div className="spinner-border color-primary" role="status">
              <span className="visually-hidden"></span>
          </div>
      </div>
  );
};

export default Spinner;