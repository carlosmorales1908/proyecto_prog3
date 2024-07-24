import BaseService from "./base.services";

class PlaylistService extends BaseService{
  constructor(token, endpoint){
    super(token, endpoint)
  }

  async getPlaylist(playlistId){
    // revisar el metodo base
    // agregar un get o modificar el existente para que reciba un id
    return this.get(`${playlistId}`)
  }

  async getAllPlaylists(){
    return this.get()
  }

  async createPlaylist(playlistData){
    return this.post(playlistData)
  }

  async updatePlaylist(playlistId, updatedData){
    // revisar el metodo base
    // agregar un get o modificar el existente para que reciba un id
    return this.put(`${playlistId}`, updatedData)
  }

  async deletePlaylist(playlistId){
    // revisar el metodo base
    // agregar un get o modificar el existente para que reciba un id
    return this.delete(`${playlistId}`)
  }
}

export default PlaylistService;