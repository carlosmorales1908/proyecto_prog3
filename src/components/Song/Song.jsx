import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.contex";
import SongService from "../../services/song.services";

const Song = ({
  song,
  onPlay,
  isPlaying,
  index,
  onDelete,
  onAddToPlaylist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
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
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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
    setShowMenu((prev) => !prev);
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
      if (onAddToPlaylist) onAddToPlaylist();
    }
    setShowMenu(false);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "bi-volume-mute";
    if (volume <= 0.7) return "bi-volume-down";
    return "bi-volume-up";
  };

  return (
    <>
      <td
        style={{ width: "15%" }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {isHovered || isPlaying ? (
          <i
            className={`bi ${
              isPlaying ? "bi-pause-fill" : "bi-play-fill"
            }`}
            role="button"
            onClick={song.song_file ? onPlay : null}
            style={{ pointerEvents: song.song_file ? "auto" : "none" }}
          ></i>
        ) : (
          index
        )}
      </td>
      <td
        style={{ width: "65%" }}
        onClick={song.song_file ? onPlay : null}
        role="button"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <h6 className={`mb-0 text-light ${!song.song_file && "text-muted"}`}>
          {song.title}
        </h6>
      </td>
      <td
        style={{ width: "20%" }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {song.song_file && (
          <div className="d-flex align-items-center position-relative">
            <div className="d-flex align-items-center me-2">
              <i
                className={`bi ${getVolumeIcon()} fs-6 me-2`}
                style={{ cursor: "pointer" }}
                onClick={toggleMute}
              ></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={volume}
                onChange={handleVolumeChange}
                className="form-range"
                style={{ width: "80px" }}
              />
            </div>
            <div className="flex-grow-1 text-start ms-2">
              <small>{song.duration}</small>
            </div>
            <div
              className="dropdown"
              ref={menuRef}
            >
              {isHovered && (
                <i
                  className="bi bi-three-dots fs-6"
                  ref={iconRef}
                  onClick={handleMenuClick}
                ></i>
              )}
              <ul
                className={`dropdown-menu dropdown-menu-dark ${showMenu ? "show" : ""}`}
                style={{ right: "0", left: "auto" }}
              >
                <li>
                  <a
                    className="dropdown-item text-light"
                    role="button"
                    onClick={() => handleMenuAction("delete")}
                  >
                    Eliminar Canción
                  </a>
                </li>
                <li>
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
        )}
        <audio
          ref={audioRef}
          src={song.song_file}
          onEnded={() => onPlay(null)}
        />
      </td>
    </>
  );
};

export default Song;
