export const PlaylistCard = ({ playlist }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body text-center">
        <h5 className="card-title">{playlist.name}</h5>
        <p className="card-text">{playlist.description}</p>
        <a href="#" className="card-link">
          Ir a la playlist
        </a>
      </div>
    </div>
  );
};
