import "../PlaylistCard/PlaylistStyle.css";
import { PrivateRoutes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

export const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card rounded-4"
      style={{ width: "300px" }}
      onClick={() =>
        navigate(`${PrivateRoutes.PLAYLISTS}/${playlist.name}/${playlist.id}`)
      }
    >
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
