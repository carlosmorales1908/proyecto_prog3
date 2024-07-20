class AuthService {
  constructor() {
    // cambiar luego a una variable de entorno
    this.baseURL = "https://sandbox.academiadevelopers.com/";
    this.jwt = null;
    this.error = null;
  }

  async login(data) {
    try {
      const URI = `${this.baseURL}api-auth/`;
      const rawResponse = await fetch(URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!rawResponse.ok) {
        throw new Error("Incorrect username or password");
      }

      const response = await rawResponse.json();
      this.jwt = response.token;
      this.error = null;
    } catch (error) {
      this.error = error.message || "Error desconocido";
      console.error("Error de login:", this.error);
    }
  }

  getToken() {
    return this.jwt;
  }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = null;
  }
}

export default AuthService;
