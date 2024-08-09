import React from "react";
import AllSongList from "../components/AllSongList/AllSongList";
const SongsPage = () => {
  return (
    <div> 
      <h1 className="mb-4 mt-2 fw-bolder">
        Biblioteca
      </h1>
      <AllSongList />
    </div>
    
  );
};

export default SongsPage;
