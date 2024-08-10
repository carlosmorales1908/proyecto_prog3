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

    async createArtist(data) {
        try {
          const URI = `${this.baseURL}${this.endpoint}`;
          const formData = new FormData();
    
          console.log(URI);
          
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
}

export default ArtistService;
