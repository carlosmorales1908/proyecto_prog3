import { useParams } from 'react-router-dom';
export default function PlaylistSongs() {
    const { id } = useParams();
    return (
        <div>
          <h1>Detalles de la playlist</h1>
          <p>ID de la playlist: {id}</p>
          {/* Aquí podrías hacer una llamada a la API para obtener más detalles del usuario usando el userId */}
        </div>
      );
}