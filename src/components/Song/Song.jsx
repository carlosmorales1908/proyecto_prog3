import React, { useRef, useState, useEffect, useContext } from "react";
import "./Song.css";
import { AuthContext } from "../../context/auth.contex";
import SongService from "../../services/song.services";

const Song = ({ song, onPlay, isPlaying, index, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const { token } = useContext(AuthContext);
  const songService = new SongService(token);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        iconRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleMenuAction = async (action) => {
    if (action === "delete") {
      try {
        await songService.delete(song.id);
        if (onDelete) onDelete(song.id);
      } catch (error) {
        console.log("No se puede eliminar la canción", error);
      }
    } else if (action === "add") {
      console.log("Agregar cancion a la playlist");
    }
    setShowMenu(false);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div
      className={`song-container p-2 rounded-3  ${
        !song.song_file && "text-muted"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: song.song_file ? "pointer" : "default" }}
    >
      <div className="row align-items-center w-100 z-1">
        <div className="col-1  ">
          {isHovered || isPlaying ? (
            <i
              className={`bi ${
                isPlaying ? "bi-pause-fill" : "bi-play-fill"
              } fs-5`}
              role="button"
              onClick={song.song_file ? onPlay : null}
              style={{ pointerEvents: song.song_file ? "auto" : "none" }}
            ></i>
          ) : (
            index
          )}
        </div>
        <div
          className={`col text-truncate `}
          onClick={song.song_file ? onPlay : null}
          role="button"
          style={{ pointerEvents: song.song_file ? "auto" : "none" }}
        >
          <h6 className={`mb-0 text-light ${!song.song_file && "text-muted"}`}>
            {song.title}
          </h6>
        </div>
        <div className="col-auto d-flex align-items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="form-range me-3"
            disabled={!song.song_file}
          />
          <div
            className="text-light me-2"
            style={{ width: "60px", textAlign: "center" }}
          >
            <small>{song.duration}</small>
          </div>
          <audio
            ref={audioRef}
            src={song.song_file}
            onEnded={() => onPlay(null)}
          />
          <div className="dropdown" ref={menuRef}>
            <i
              className={`bi bi-three-dots fs-5 ${
                isHovered ? "d-block" : "d-none"
              }`}
              ref={iconRef}
              onClick={handleMenuClick}
            ></i>
            <ul
              className={`dropdown-menu dropdown-menu-dark ${
                showMenu ? "show" : ""
              }`}
            >
              <li className="item">
                <a
                  className="dropdown-item text-light"
                  role="button"
                  onClick={() => handleMenuAction("delete")}
                >
                  Eliminar Canción
                </a>
              </li>
              <li className="item">
                <a
                  className="dropdown-item text-light"
                  role="button"
                  onClick={() => handleMenuAction("add")}
                >
                  Agregar a una playlist
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
