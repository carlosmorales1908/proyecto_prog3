import { useParams } from "react-router-dom";
import PlaylistService from "../../services/playlists.services";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.contex";
import Spinner from "../Spinner/Spinner";
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
            console.log(response);
            if(response) {
                songIds = response.entries.sort();
                console.log(songIds);
                setplaylistData({
                    playlistName: response.name,
                    owner: response.owner,
                    description: response.description,
                    quantity: songIds.length,
                });
                getOwnerData(response.owner);
                getSongs(songIds);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        }
        finally {
            //setIsLoading(false);
        }
    }

    async function getOwnerData(ownerId) {
        try {
            setIsLoading(true);
            const userProfileService = new UserProfileService(token);
            const response = await userProfileService.getProfileById(ownerId);
            console.log(response);
            if (response) {
                setOwnerData({
                    firstName: response.first_name,
                    lastName: response.last_name,
                    profilePicture: response.image,
                });
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getSongs(songIdList) {
        try {
            setIsLoading(true);
            const songService = new SongService(token);
            const response = await songService.getSongsById(songIdList);
            console.log(response);
            if (response) {
                setSongsList(response);
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        } finally{
            setIsLoading(false);
        }
    }

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
                    {ownerData.profilePicture && <img src= {`${import.meta.env.VITE_BASE_URL}${ownerData.profilePicture}`} className="object-fit-cover rounded-circle me-2" style={{width: '30px', height: '30px'}} alt="profile-img" />}
                    {ownerData.firstName && ownerData.firstName.split(" ")[0]} {ownerData.lastName && ownerData.lastName.split(" ")[0]} {'• '}
                    {playlistData.quantity} canciones
                </h6>
            </div>
            <div className="body-section bg-black p-2 text-dark bg-opacity-25 bg-gradient">
                {playlistData.quantity == 0 ?(
                    <h3 className="text-center text-secondary">No hay canciones en esta playlist</h3>
                ):(
                    <>
                    {/* Llamar aqui al componente de lista de canciones y pasarle "songList" */}
                    </>
                )}

            </div>
        </div>
    );
}
