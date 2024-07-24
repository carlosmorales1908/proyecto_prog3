class BaseService {
  constructor(token, endpoint) {
    this.baseURL = import.meta.env.VITE_BASE_URL;
    this.token = token;
    this.endpoint = endpoint;
  }

  async request(options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseURL}/${this.endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async get() {
    // HACEER UN getALL() y un getOne
    // MIRAR TEMA DE URI PARA PASAR IDS EN getOne(), POST, PUT, DELETE
    return this.request({ method: "GET" });
  }

  async post(data) {
    return this.request({
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(data) {
    return this.request({
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete() {
    return this.request({
      method: "DELETE",
    });
  }
}
export default BaseService;
