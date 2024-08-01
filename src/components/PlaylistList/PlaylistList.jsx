import { useEffect, useRef, useState } from "react";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";

const PlaylistList = () => {
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef();
  const lastPlaylistElementRef = useRef(null);

  const doFetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/harmonyhub/playlists/?page=${page}&page_size=10`
      );
      if (!response.ok) {
        throw new Error("No se pudieron cargar las playlists");
      }
      const data = await response.json();
      if (data.results) {
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.results]);
        setNextUrl(data.next);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    doFetch();
  }, [page]);

  useEffect(() => {
    if (isLoading || !nextUrl) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextUrl) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    observerRef.current = observer;

    if (lastPlaylistElementRef.current) {
      observer.observe(lastPlaylistElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, nextUrl]);

  if (isError) return <p>Error al cargar las playlists.</p>;
  if (!playlists.length && !isLoading)
    return <p>No hay playlists disponibles</p>;

  return (
    <>
      <div className="row g-5">
        {playlists.map((playlist, index) => {
          const isLastElement = index === playlists.length - 1;
          return (
            <div
              key={`${playlist.id}-${index}`}
              className="col-4"
              ref={isLastElement ? lastPlaylistElementRef : null}
            >
              <PlaylistCard playlist={playlist} />
            </div>
          );
        })}
      </div>
      {isLoading && <p>Cargando más Playlists...</p>}
    </>
  );
};

export default PlaylistList;
