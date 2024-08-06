import { useState } from "react";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import usePlaylists from "../../hooks/usePlaylists";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../Spinner/Spinner";
import NewPlaylist from "../NewPlaylist/NewPlaylist";

const PlaylistList = () => {
  const [page, setPage] = useState(1);
  const { playlists, nextUrl, isError, isLoading } = usePlaylists(page);

  const loadMorePlaylists = () => setPage((prevPage) => prevPage + 1);

  const lastElementRef = useInfiniteScroll(
    nextUrl,
    isLoading,
    loadMorePlaylists
  );

  if (isError) return <p>Error al cargar las playlists.</p>;
  if (!playlists.length && !isLoading)
    return <p>No hay playlists disponibles</p>;

  return (
    <>
      <div className="header d-flex justify-content-between">
        <div className="m-3 mt-0 fs-1 fw-fw-bolt text-center ">
          TUS MEJORES PLAYLISTS LAS ECONTRAS AQUI:
        </div>
        <div>
          <NewPlaylist />
        </div>
      </div>
      <div className="row g-5">
        {playlists.map((playlist, index) => {
          const isLastElement = index === playlists.length - 1;
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
