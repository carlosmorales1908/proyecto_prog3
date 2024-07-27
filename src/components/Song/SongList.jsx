import React, { useEffect, useState, useMemo } from "react";
import Song from "./Song";
import SongService from "../../services/song.services";
import Spinner from "../Spinner/Spinner";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
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
    setPlayingAudio(playingAudio === song.id ? null : song.id);
  };

  const clearError = () => {
    setFetchError(null);
  };

  return (
    <div className="container mt-5">
      {fetchError && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <p className="mb-0">Error: {fetchError}</p>
          <button onClick={clearError} className="btn btn-warning btn-sm">
            Clear Error
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`overflow-auto ${showScrollbar ? 'scrollbar-thin' : ''}`}
          style={{ maxHeight: 'calc(80vh - 70px)' }}
          onMouseEnter={() => setShowScrollbar(true)}
          onMouseLeave={() => setShowScrollbar(false)}
        >
          <div className="sticky-top bg-dark text-light p-2 mb-2 z-1">
            <div className="d-flex justify-content-between align-items-center">
              <div className="col-1">
                <strong>#</strong>
              </div>
              <div className="flex-grow-1">
                <strong>Título</strong>
              </div>
              <div className=" position-relative text-center flex-grow-2"  style={{ right: "38%" }}>
                <i className="bi bi-clock"></i>
              </div>
            </div>
          </div>
          <div className="list-group">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <Song
                  key={song.id}
                  song={song}
                  onPlay={() => handlePlayAudio(song)}
                  isPlaying={playingAudio === song.id}
                  index={index + 1}
                />
              ))
            ) : (
              <p className="text-warning text-center">No songs available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
