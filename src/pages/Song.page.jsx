import React from "react";
import SongList from "../components/Song/SongList";

const SongsPage = () => {
  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4">Lista de Canciones</h1>
        <SongList />
      </div>
    </div>
  );
};

export default SongsPage;
