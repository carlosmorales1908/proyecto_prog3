import React from "react";
import AllSongList from "../components/AllSongList/AllSongList";
const SongsPage = () => {
  return (
    <div> 
      <div className="m-3 mt-0 fs-1 fw-fw-bolt">
        Biblioteca de sentimientos
      </div>
      <AllSongList />
    </div>
    
  );
};

export default SongsPage;
