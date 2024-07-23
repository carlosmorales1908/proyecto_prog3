import React from "react";

const Song = ({
  song,
  onAddToList,
  onRemoveFromList,
  onDelete,
  onPlay,
  isPlaying,
}) => {
  return (
    <div className="card bg-dark text-light mb-3 shadow-lg">
      <div className="card-body d-flex flex-column align-items-center text-center">
        <div className="mb-3">
          <h5 className="card-title">{song.title}</h5>
          <div>
            <audio id={song.id} controls onPlay={() => onPlay(song)}>
              <source src={song.song_file} type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 w-100">
          <button
            className="btn btn-outline-success btn-block mb-2"
            onClick={() => onAddToList(song)}
          >
            Agregar a lista
          </button>
          <button
            className="btn btn-outline-warning btn-block mb-2"
            onClick={() => onRemoveFromList(song)}
          >
            Eliminar de lista
          </button>
          <button
            className="btn btn-outline-danger btn-block"
            onClick={() => onDelete(song)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Song;
