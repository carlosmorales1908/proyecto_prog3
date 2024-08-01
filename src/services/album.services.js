import BaseService from "./base.services";

class AlbumService extends BaseService {
    constructor(token) {
        super(token, import.meta.env.VITE_URI_ALBUMS);
    }

    async requestAlbums(uri ,param = null, options = {}) {
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${this.token}`,
          ...options.headers,
        };
    
        try {
          let URI = uri;
          if (param) {
            URI += `/${param}`;
          }
    
          const response = await fetch(URI, {
            ...options,
            headers,
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          return await response.json();
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }

    async getAlbum(id) {
        return this.getOne(id);
    }


    async getAllAlbums() {
        let albums = [];
        let data = await this.getAll();
        albums = albums.concat(data.results);
        let nextPageUrl = this.converToSecureUrl(data.next);

        while (nextPageUrl) {
            data = await this.requestAlbums(nextPageUrl,null, { method: "GET", headers: { Authorization: `Token ${this.token}` } });
            albums = albums.concat(data.results);
            console.log(data);
            if (data.next) {
                nextPageUrl = this.converToSecureUrl(data.next);
            }
            else {
                break;
            }
        }
        return albums;
    }
    
    converToSecureUrl (url) {
        return url.replace(/^http:\/\//, 'https://');
    }

    async createAlbum(data) {
        return this.post(data);
    }

    async updateAlbum(id, data) {
        return this.put(id, data);
    }

    async deleteAlbum(id) {
        return this.delete(id);
    }
}

export default AlbumService;
