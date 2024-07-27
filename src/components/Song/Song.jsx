import React, { useRef, useState, useEffect } from "react";
import SongMenu from "./SongMenu";

const Song = ({ song, onPlay, isPlaying, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const audioRef = useRef(null);


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action) => {
    if (action === "delete") {
      console.log("Eliminar Canción");
    } else if (action === "add") {
      console.log("Agregar a la Lista");
    }
    setShowMenu(false);
  };

  return (
    <div
      className={`position-relative d-flex align-items-center p-2 rounded-3 ${isHovered ? 'bg-secondary' : 'bg-transparent'} text-light`}
      
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="col-1">
        {isHovered || isPlaying ? (
          <i
            className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} fs-5`}
            role="button"
            onClick={onPlay}
          ></i>
        ) : (
          index
        )}
      </div>
      <div className="flex-grow-1 me-3"  onClick={onPlay} role="button">
        <h6 className="mb-1">{song.title}</h6>
      </div>
      <div className="text-light position-relative flex-grow-2" role="button" style={{ right: "36%" }}>
        <small>{song.duration}</small>
      </div>
      <div className="d-flex align-items-center ms-3 position-relative">
        <audio
          ref={audioRef}
          src={song.song_file}
          onEnded={() => onPlay(null)}
        />
        <i
      
          className={`bi bi-three-dots fs-5 ${isHovered ? 'd-block' : 'd-none'}`}
          onClick={handleMenuClick}
        ></i>
        {showMenu && (
          <SongMenu
            onClose={() => setShowMenu(false)}
            onAction={handleMenuAction}
         
            className={""}
          />
        )}
      </div>
    </div>
  );
};

export default Song;
