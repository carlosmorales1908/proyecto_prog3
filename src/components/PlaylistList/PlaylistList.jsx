import { useState } from "react";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import usePlaylists from "../../hooks/usePlaylists";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../Spinner/Spinner";
import NewPlaylist from "../NewPlaylist/NewPlaylist";
import Search from "../Search/Search";

const PlaylistList = () => {
  const [page, setPage] = useState(1);
  const { playlists, nextUrl, isError, isLoading } = usePlaylists(page);

  const [searchQuery, setSearchQuery] = useState("");

  const loadMorePlaylists = () => setPage((prevPage) => prevPage + 1);

  const lastElementRef = useInfiniteScroll(
    nextUrl,
    isLoading,
    loadMorePlaylists
  );

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isError) return <p>Error al cargar las playlists.</p>;
  if (!filteredPlaylists.length && !isLoading)
    return <p>No hay playlists disponibles</p>;

  return (
    <>
      <div className="header d-flex justify-content-between">
        <h1 className="m-3 mt-0 fs-1">Playlist</h1>
        <div>
          <NewPlaylist />
        </div>
      </div>
      <div className="row g-5">
        <Search onSearch={handleSearch} />
        {filteredPlaylists.map((playlist, index) => {
          const isLastElement = index === filteredPlaylists.length - 1;
          return (
            <div
              key={`${playlist.id}-${index}`}
              className="col-4"
              ref={isLastElement ? lastElementRef : null}
            >
              <PlaylistCard playlist={playlist} />
            </div>
          );
        })}
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default PlaylistList;
