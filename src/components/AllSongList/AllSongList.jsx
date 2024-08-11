import { useState, useContext, useEffect, useRef } from "react";
import SongList from "../Song/SongList";
import Spinner from "../Spinner/Spinner";
import Search from "../Search/Search";
import SongService from "../../services/song.services";
import { AuthContext } from "../../context/auth.contex";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const AllSongList = () => {
  const [page, setPage] = useState(1);
  const [songs, setSongs] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext);
  const songServiceRef = useRef(new SongService(token));

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const data = await songServiceRef.current.getSongsByPage(page, 10);
        setSongs((prevSongs) => [...prevSongs, ...data.results]);
        setNextUrl(data.next);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    doFetch();
  }, [page, token]);

  const loadMoreSongs = () => {
    if (nextUrl) setPage((prevPage) => prevPage + 1);
  };

  const lastElementRef = useInfiniteScroll(nextUrl, isLoading, loadMoreSongs);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (songId) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  if (isError)
    return <p className="text-warning">Error al cargar las canciones.</p>;

  return (
    <>
      <h1 className="mb-4 mt-2 fw-bolder">
        Biblioteca
      </h1>
      <Search onSearch={handleSearch} />
      <SongList
        songs={filteredSongs}
        lastElementRef={nextUrl ? lastElementRef : null}
        onDelete={handleDelete}
      />
      {isLoading && <Spinner />}
      {!isLoading && filteredSongs.length === 0 && (
        <p className="text-center text-warning">
          No hay canciones disponibles
        </p>
      )}
    </>
  );
};

export default AllSongList;
