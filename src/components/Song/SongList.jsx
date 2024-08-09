import React, { useState } from "react";
import Song from "./Song";
import NewSongToPlaylistModal from "../NewSongToPlaylist/NewSongToPlaylistModal";

const SongList = ({ songs = [], lastElementRef = null, onDelete }) => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

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

  const openModalWithSong = (songId) => {
    setSelectedSongId(songId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSongId(null);
  };

  return (
    <div className="overflow-auto" style={{ maxHeight: "calc(70vh - 70px)" }}>
      <div className="sticky-top bg-dark text-light p-2 z-1">
        <div className="d-flex justify-content-between align-items-center">
          <strong>#</strong>
          <strong
            className="text-center position-relative"
            style={{ right: "36%" }}
          >
            Título
          </strong>
          <i
            className="bi bi-clock position-relative text-end"
            style={{ right: "4%" }}
          ></i>
        </div>
      </div>

      <div className="list-group">
        {songs.map((song, index) => {
          const isLastElement = index === songs.length - 1;
          return (
            <div
              key={`${song.id}-${index}`}
              ref={isLastElement && lastElementRef ? lastElementRef : null}
            >
              <Song
                song={song}
                index={index + 1}
                onPlay={() => handlePlayAudio(song)}
                isPlaying={playingAudio === song.id}
                onDelete={onDelete ? () => onDelete(song.id) : null}
                onAddToPlaylist={() => openModalWithSong(song.id)}
              />
            </div>
          );
        })}
      </div>

      {showModal && (
        <NewSongToPlaylistModal
          showModal={showModal}
          setShowModal={closeModal}
          songId={selectedSongId}
        />
      )}
    </div>
  );
};

export default SongList;
