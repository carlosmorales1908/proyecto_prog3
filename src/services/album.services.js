import BaseService from "./base.services";
import convertToSecure from "../utility/secureUrl";

class AlbumService extends BaseService {
    constructor(token) {
        super(token, import.meta.env.VITE_URI_ALBUMS);
    }

    async getAlbum(id) {
        return this.getOne(id);
    }

    async getAlbumsByTitle(term) {
        return this.request(`?title=${term}`);
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
