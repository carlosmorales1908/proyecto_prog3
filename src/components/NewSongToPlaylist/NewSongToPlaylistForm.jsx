import { useContext } from "react";
import PlaylistService from "../../services/playlists.services";
import ApiSelect from "../Select/ApiSelect";
import { AuthContext } from "../../context/auth.contex";

 const  NewSongToPlaylistForm = ({ handleInputChange, values, errors }) => {
    const { token } = useContext(AuthContext);

    async function getPlaylistOptions(term) {
        let playlistOptions = [];
        if (!term || term.length < 2) {
            return playlistOptions;
        }
        try {
            const playlistService = new PlaylistService(token);
            const response = await playlistService.getPlaylistsByName(term);
            console.log(response)
            if (response && response.results) {
                playlistOptions = response.results.map((playlist) => ({
                    value: playlist.id,
                    label: playlist.name,
                }));
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        }
        return playlistOptions;
    }

    return (
        <form className="px-3">
            <div className="">
                <label htmlFor="playlist" className="form-label me-3">
                    Playlist
                </label>
                <div style={{ minWidth: "90%" }}>
                    <ApiSelect
                        id="playlist"
                        name="playlist"
                        getOptions={getPlaylistOptions}
                        handleChange={handleInputChange}
                    />
                </div>
            </div>
            {errors.playlist && (
                <div className="text-start">
                    <small className="text-danger">{errors.playlist}</small>
                </div>
            )}
        </form>
    );
}
export default NewSongToPlaylistForm;