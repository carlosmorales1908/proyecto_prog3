import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import Song from "./Song";
import Search from "../Search/Search";
import { AuthContext } from "../../context/auth.contex";
import SongService from "../../services/song.services";
import Spinner from "../Spinner/Spinner";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [query, setQuery] = useState(""); 
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const songService = new SongService(token);

  const observer = useRef();
  const lastSongElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        handleLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const fetchSongs = async (page, reset = false) => {
    setIsLoading(true);
    try {
      const data = await songService.getSongsByPage(page, 5);
      if (data.results) {
        setSongs(prevSongs => reset ? data.results : [...prevSongs, ...data.results]);
        setFilteredSongs(prevSongs => reset ? data.results : [...prevSongs, ...data.results]);
        setHasMore(!!data.next);
      }
    } catch (error) {
      setFetchError(error.message || "Error al obtener las canciones");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchSongs(page);
  }, [page]);

  useEffect(() => {
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(results);
  }, [query, songs]);

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

  const handleDelete = (songId) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
    <div className="container mt-5 container-list">
      {isLoading && songs.length === 0 ? (
        <Spinner />
      ) : (
        <>
          {fetchError && (
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
              <p className="mb-0">Error: {fetchError}</p>
              <button onClick={clearError} className="btn btn-warning btn-sm">
                Clear Error
              </button>
            </div>
          )}
          <div>
            <Search onSearch={handleSearch} />
            <div
              className={`overflow-auto ${showScrollbar ? "scrollbar-thin" : ""}`}
              style={{ maxHeight: "calc(80vh - 70px)" }}
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
                  <div className="position-relative text-center flex-grow-2" style={{ right: "38%" }}>
                    <i className="bi bi-clock"></i>
                  </div>
                </div>
              </div>
              <div className="list-group">
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song, index) => (
                    <div
                      key={song.id}
                      ref={index === filteredSongs.length - 1 ? lastSongElementRef : null}
                    >
                      <Song
                        song={song}
                        onPlay={() => handlePlayAudio(song)}
                        isPlaying={playingAudio === song.id}
                        index={index + 1}
                        onDelete={handleDelete}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-warning text-center">No songs available</p>
                )}
              </div>
              {isLoading && <Spinner />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SongList;
