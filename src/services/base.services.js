class BaseService {
  constructor(token, endpoint) {
    this.baseURL = import.meta.env.VITE_BASE_URL;
    this.token = token;
    this.endpoint = endpoint;
  }

  async request(param = null, options = {}) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
      ...options.headers,
    };

    try {
      let URI = `${this.baseURL}/${this.endpoint}`;
      if (param) {
        URI += `/${param}`;
      }

      const response = await fetch(URI, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error({error: response});
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOne(param) {
    return this.request(param, { method: "GET" });
  }

  async getAll() {
    return this.request(null, { method: "GET" });
  }

  async post(data) {
    return this.request(null, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(param, data) {
    return this.request(param, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(param) {
    return this.request(param, {
      method: "DELETE",
    });
  }
}

export default BaseService;

// USAR DE MODELO playlists.services.js
