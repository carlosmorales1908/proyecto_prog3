import React, { useState } from "react";
import Song from "./Song";

const SongList = ({ songs = [], lastElementRef = null, onDelete }) => {
  const [playingAudio, setPlayingAudio] = useState(null);

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

  return (
    <div className="overflow-auto" style={{ maxHeight: "calc(70vh - 70px)"}}>
      <div className="sticky-top bg-dark text-light p-2 z-1">
        <div className="d-flex justify-content-between align-items-center">
          <strong>#</strong>
          <strong
            className=" text-center position-relative"
            style={{ right: "36%" }}
          >
            Título
          </strong>
          <i
            className="bi bi-clock position-relative text-end"
            style={{ right: "2%" }}
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
               
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
