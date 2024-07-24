export default function UploadSongForm() {
  return (
    <>
      <h1 className="mb-4">Subir Canción</h1>
      <form
        action="/ruta-de-tu-servidor"
        method="post"
        encType="multipart/form-data"
        className="text-white"
      >
        <div>
          <label htmlFor="title" className="me-2 mb-3">Título:</label>
          <input type="text" id="title" name="title" minLength={1} maxLength={255} required />
        </div>
        <div>
          <label htmlFor="year" className="me-2 mb-3">Año de lanzamiento:</label>
          <input type="number" id="year" name="year" minLength={-2147483648} maxLength={2147483647} />
        </div>
        <div>
          <label htmlFor="duration" className="me-2 mb-3">Duración (segundos):</label>
          <input type="number" id="duration" name="duration" minLength={1} maxLength={2147483647} />
        </div>
        <div>
          <label htmlFor="album" className="me-2 mb-3">Álbum:</label>
          <input type="number" id="album" name="album" minLength={1}  />
        </div>
        <div>
          <label htmlFor="audio" className="me-2">Archivo de audio:</label>
          <br />
          {/* <input
            type="file"
            id="audio"
            name="audio"
            accept="audio/*"
            
            required
          /> */}
          <div class="input-group">
            <input type="file" className="form-control" id="audio" name="song_file" accept="audio/*" aria-describedby="audio" aria-label="Upload" required/>
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-4">Subir Canción</button>
      </form>
    </>
  );
}

/*
Song{
    title*	string
        title: Título
        maxLength: 255
        minLength: 1
    year	integer
        title: Año de lanzamiento
        maximum: 2147483647
        minimum: -2147483648
        x-nullable: true
    duration	integer
        title: Duración (segundos)
        maximum: 2147483647
        minimum: -2147483648
        x-nullable: true
    album	integer
        title: Álbum
        x-nullable: true
}

Example:
{
  "title": "string",
  "year": 2147483647,
  "duration": 2147483647,
  "album": 0
}
*/
