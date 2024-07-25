import "../PlaylistCard/PlaylistStyle.css";

export const PlaylistCard = ({ playlist }) => {
  return (
    <div className="card" style={{ width: "300px" }}>
      <div className="container mt-2">
        <img src="src\assets\micro.jpeg" className="card-img-top rounded-4" />
        <div className="card-body text-center">
          <h5 className="card-title fs-2">{playlist.name}</h5>
          <p className="card-text fs-5">{playlist.description}</p>
        </div>
      </div>
    </div>
  );
};
