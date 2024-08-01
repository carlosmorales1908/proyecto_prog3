import BaseService from "./base.services";

class SongService extends BaseService {
    constructor(token) {
        super(token, import.meta.env.VITE_URI_SONGS);
    }


    // Si alguien lee esto quiero decirle que fue un hardcodeo de ultima hora
    // el programador que lo hizo se estreso
    // posdata: toy cansado jefe
  async getSongsByPage(page, pageSize) {
    try {
      const URI = `${import.meta.env.VITE_BASE_URL}harmonyhub/songs/?page=${page}&page_size=${pageSize}`;
      const response = await fetch(URI, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${this.token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching songs by page: ", error);
      throw error;
    }
  }
    async getSongById(songId) {
        return this.getOne(songId);
    }

    async addSong(data) {
        try {
            const URI = `${this.baseURL}harmonyhub/songs/`;
            const formData = new FormData();
        
            for (const key in data) {
                formData.append(key, data[key] || '');
            }
            const rawResponse = await fetch(URI, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Token ${this.token}`,
                },
                body: formData,
            });
            
            if (!rawResponse.ok) {
                const response = await rawResponse.json();
                console.log(response);
                if ('detail' in response) { 
                    throw new Error(response.detail);
                }
                else {
                    throw new Error(response.non_field_errors[0]);
                }
            }

            const response = await rawResponse.json();
            return { success: true, data: response };

        } catch (error) {
            this.error = error.message || "Unknown error";
            return { success: false, error: error.message || "Unknown error" };
        }
    }

    async updateSong(id, data) {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key] || '');
        }
        return this.request(id, {
            method: "PUT",
            body: formData,
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${this.token}`,
            },
        });
    }

    async deleteSong(id) {
        return this.delete(id);
    }
}

export default SongService;
