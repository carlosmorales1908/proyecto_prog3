import { useParams } from "react-router-dom";
import PlaylistService from "../../services/playlists.services";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import Spinner from "../Spinner/Spinner";
import SongsList from "./SongsList";
import SongService from "../../services/song.services";
import UserProfileService from "../../services/profile.services";

let songIds;
export default function PlaylistSongs() {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [playlistData, setplaylistData] = useState({});
    const [ownerData, setOwnerData] = useState({});
    const [songList, setSongsList] = useState([]);

    useEffect(() => {
        getPlaylistData();
    }, []);

    async function getPlaylistData() {
        try {
            setIsLoading(true);

            const playlistService = new PlaylistService(token);
            const response = await playlistService.getPlaylist(id);
            songIds = response.entries.sort();
            console.log(songIds);
            
            setplaylistData({
                playlistName: response.name,
                owner: response.owner,
                description: response.description,
                quantity: songIds.length,
            });

            const userProfileService = new UserProfileService(token);
            const profileResponse = await userProfileService.getProfileById(response.owner);
            setOwnerData({
                firstName: profileResponse.first_name,
                lastName: profileResponse.last_name,
                profilePicture: profileResponse.image,
            });
            console.log(profileResponse);

            const playlistSongs = new SongService(token);
            const songsResponse = await playlistSongs.getSongsById(songIds);
            console.log(songsResponse);
            setSongsList(songsResponse);

        } catch (error) {
            console.log("Unexpected error:", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    // async function getSongs() {
    //     const songService = new SongService(token);
    //     const songs = await songService.getSongsByIds(songIds);
    // }

    return isLoading ? (
        <div>
            <Spinner />
        </div>
    ) : (
        <div>
            <div className="header-section">
                <p className="mb-1" style={{ paddingLeft: "0.3rem" }}>
                    Playlist
                </p>
                <h1 style={{ fontSize: "5rem" }}>
                    {playlistData.playlistName}
                </h1>
                <small
                    className="text-white-50"
                    style={{ paddingLeft: "0.3rem" }}
                >
                    {playlistData.description}
                </small>
                <h6 className="pt-2" style={{ paddingLeft: "0.3rem" }}>
                    {ownerData.profilePicture && <img src= {`https://sandbox.academiadevelopers.com/media/users/profiles/${ownerData.profilePicture.split("profiles/")[1]}`} className="rounded-circle me-2" style={{width: '30px', height: '30px'}} alt="profile-img" />}
                    {ownerData.firstName.split(" ")[0]} {ownerData.lastName.split(" ")[0]} {'• '}
                    {playlistData.quantity} canciones
                </h6>
            </div>
            <div className="body-section bg-black p-2 text-dark bg-opacity-25 bg-gradient">
                {/* Llamar aqui al componente de lista de canciones y pasarle "songList" */}
            </div>
        </div>
    );
}
