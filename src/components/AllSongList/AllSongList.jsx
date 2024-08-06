import { useState, useContext, useCallback, useEffect, useRef } from "react";
import SongList from "../Song/SongList";
import Spinner from "../Spinner/Spinner";
import Search from "../Search/Search";
import SongService from "../../services/song.services";
import { AuthContext } from "../../context/auth.contex";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const AllSongList = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [songs, setSongs] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const { token } = useContext(AuthContext);

  const songServiceRef = useRef(new SongService(token));

  const fetchSongs = useCallback(async () => {
    if (!nextUrl && page !== 1) return;

    setIsLoading(true);
    setIsError(false);
    try {
      const pageSize = 10;
      const data = await songServiceRef.current.getSongsByPage(page, pageSize);
      setSongs((prevSongs) => [...prevSongs, ...data.results]);
      setNextUrl(data.next || null);
      if (data.next) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNextUrl(null);
      } else {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, nextUrl]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreSongs = () => {
    if (nextUrl) setPage((prevPage) => prevPage + 1);
  };

  const lastElementRef = useInfiniteScroll(nextUrl, isLoading, loadMoreSongs);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (songId) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  if (isError)
    return <p className="text-warning">Error al cargar las canciones.</p>;

  return (
    <div>
      <Search onSearch={handleSearch} />
      <SongList
        songs={filteredSongs}
        lastElementRef={nextUrl ? lastElementRef : null}
        onDelete={handleDelete}
      />
      {isLoading && <Spinner />}
      {songs.length === 0 && !isLoading && (
        <p className="text-center text-warning">No hay canciones disponibles</p>
      )}
    </div>
  );
};

export default AllSongList;
