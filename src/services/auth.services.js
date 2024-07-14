class AuthService {
  constructor() {
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

      const response = await rawResponse.json();
      this.jwt = response.token;
    } catch (error) {
      this.error = error;
      console.log(this.error);
    }
  }

  getToken() {
    return this.jwt;
  }
}

export default AuthService;
