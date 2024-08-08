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

      if (response.status === 204) {
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${JSON.stringify(errorData)}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Request failed:", error);
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
