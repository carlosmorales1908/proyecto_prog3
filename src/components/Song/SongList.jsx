import React, { useEffect, useState, useMemo } from "react";
import Song from "./Song";
import SongService from "../../services/song.services";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(null);
  const songService = useMemo(() => new SongService(), []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await songService.getAllSongs();
        if (fetchedSongs) {
          setSongs(fetchedSongs);
        }
      } catch (error) {
        setFetchError(error.message || "Error al obtener las canciones");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, [songService]);


  const handlePlayAudio = (song) => {
    if (playingAudio && playingAudio !== song.id) {
     
      const previousAudio = document.getElementById(playingAudio);
      if (previousAudio) {
        previousAudio.pause();
        previousAudio.currentTime = 0;
      }
    }
    setPlayingAudio(song.id);
  };

  // Función a completar mas adelante
  const handleAddToList = (song) => {
    console.log("Agregar a lista:", song);
  };

  // Función a completar mas adelante
  const handleRemoveFromList = (song) => {
    console.log("Eliminar de lista:", song);
  };

  // Función a completar mas adelante
  const handleDelete = async (song) => {
   console.log("Eliminar Cancion: ", song)
  };

  const clearError = () => {
    setFetchError(null);
  };

  return (
    <div className="container mt-4">
      {fetchError && (
        <div className="alert alert-danger">
          <p>Error: {fetchError}</p>
          <button onClick={clearError} className="btn btn-warning">
            Clear Error
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div className="row">
          {songs.length > 0 ? (
            songs.map((song) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={song.id}>
                <Song
                  song={song}
                  onAddToList={handleAddToList}
                  onRemoveFromList={handleRemoveFromList}
                  onDelete={handleDelete}
                  onPlay={() => handlePlayAudio(song)}
                  isPlaying={playingAudio === song.id}
                />
              </div>
            ))
          ) : (
            <p>No songs available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SongList;
