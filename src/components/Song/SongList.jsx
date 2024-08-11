import { useState } from "react";
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
    <div
      className="overflow-auto bg-black bg-gradient container-fluid rounded px-0"
      style={{ maxHeight: "calc(80vh - 70px)" }}
    >
      <table
        className="table table-borderless  table-hover table-responsive w-100 mb-0"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="border-bottom">
          <tr className="sticky-top bg-dark">
            <th style={{ width: "15%" }}>#</th>
            <th style={{ width: "65%" }}>Título</th>
            <th style={{ width: "20%" }}>
              <i
                className="bi bi-clock position-relative "
                style={{ left: "60%" }}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => {
            const isLastElement = index === songs.length - 1;
            return (
              <tr
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
              </tr>
            );
          })}
        </tbody>
      </table>

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
