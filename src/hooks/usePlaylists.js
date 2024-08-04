import { useEffect, useState } from "react";

const usePlaylists = (page) => {
  const [playlists, setPlaylists] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

    doFetch();
  }, [page]);

  return { playlists, nextUrl, isError, isLoading };
};

export default usePlaylists;
