import BaseService from "./base.services";

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
        try {
            const URI = `${this.baseURL}${this.endpoint}/`;
            const formData = new FormData();
      
            for (const key in data) {
              formData.append(key, data[key] || "");
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
              if ("detail" in response) {
                throw new Error(response.detail);
              } else {
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

    async updateAlbum(id, data) {
        return this.put(id, data);
    }

    async deleteAlbum(id) {
        return this.delete(id);
    }
}

export default AlbumService;
