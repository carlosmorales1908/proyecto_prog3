import { useContext, useEffect } from "react";
import PlaylistService from "../services/playlists.services";
import { AuthContext } from "../context/auth.contex";

const Playlists = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const playlistService = new PlaylistService(token);
    playlistService.getAllPlaylists().then((playlist) => console.log(playlist));
  }, [token]);

  return <div>Playlists.page</div>;
};
export default Playlists;
