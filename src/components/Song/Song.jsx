import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
import "./Song.css";
import { AuthContext } from "../../context/auth.contex";
import SongService from "../../services/song.services";

const Song = ({ song, onPlay, isPlaying, index, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const audioRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log("Token in Song component:", token);
  }, [token]);

  const songService = useMemo(() => {
    console.log("Creating new SongService instance with token:", token);
    return new SongService(token);
  }, [token]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

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
        console.log("Attempting to delete song with ID:", song.id);
        await songService.deleteSong(song.id);
        console.log("Canción eliminada con éxito");
        if (onDelete) onDelete(song.id); // Notificar al padre sobre la eliminación
      } catch (error) {
        console.error("Error eliminando la canción:", error);
      }
    } else if (action === "add") {
      console.log("Agregar a la Lista");
    }
    setShowMenu(false);
  };

  return (
    <div
      className={`position-relative d-flex align-items-center p-2 rounded-3 song-container text-light ${
        !song.song_file && "not-song"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="col-1">
        {isHovered || isPlaying ? (
          <i
            className={`bi ${
              isPlaying ? "bi-pause-fill" : "bi-play-fill"
            } fs-5`}
            role="button"
            onClick={onPlay}
          ></i>
        ) : (
          index
        )}
      </div>
      <div className={`flex-grow-1 me-3`} onClick={onPlay} role="button">
        <h6 className={`mb-1`}>{song.title}</h6>
      </div>
      <div
        className="text-light position-relative flex-grow-2"
        role="button"
        style={{ right: "36%" }}
      >
        <small>{song.duration}</small>
      </div>
      <div className="d-flex align-items-center ms-3">
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
          <ul className={`dropdown-menu dropdown-menu-dark ${showMenu ? "show" : ""}`}>
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
                Agregar a la Lista
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Song;
