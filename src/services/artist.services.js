import BaseService from "./base.services";

class ArtistService extends BaseService {
    constructor(token) {
        super(token, import.meta.env.VITE_URI_ARTISTS);
    }

    async getArtist(id) {
        return this.getOne(id);
    }

    async getArtistsByName(term) {
      return this.request(`?name=${term}`);
  }
}

export default ArtistService;
