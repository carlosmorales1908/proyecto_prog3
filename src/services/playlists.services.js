import BaseService from "./base.services";

class PlaylistService extends BaseService {
  constructor(token) {
    super(token, import.meta.env.VITE_URI_PLAYLISTS);
  }

  async getPlaylist(playlistId) {
    return this.getOne(playlistId);
  }

  async getPlaylistsByName(term) {
    return this.request(`?name=${term}`);
  }

  async getAllPlaylists() {
    return this.getAll();
  }

  async createPlaylist(playlistData) {
    return this.post(playlistData);
  }

  async updatePlaylist(playlistId, updatedData) {
    return this.put(playlistId, updatedData);
  }

  async deletePlaylist(playlistId) {
    return this.delete(playlistId);
  }
}

export default PlaylistService;