import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import PlaylistService from "../../services/playlists.services";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";

const PlaylistList = () => {
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const playlistService = new PlaylistService(token);
    playlistService
      .getAllPlaylists()
      .then((playlist) => setPlaylists(playlist));
  }, [token]);
  
  return (
    <div className="row gx-5 gy-5">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="col-4">
          <PlaylistCard playlist={playlist} />
        </div>
      ))}
    </div>
  );
};
export default PlaylistList;
