import BaseService from "./base.services";

class UserProfileService extends BaseService {
  constructor(token) {
    super(token, import.meta.env.VITE_URI_USER_PROFILE);
  }

  async getProfile() {
    return this.getAll();
  }

  async getProfileById(id) {
    this.endpoint = import.meta.env.VITE_URI_USER_PROFILE_BY_ID;
    const response = await this.getOne(id);
    this.endpoint = import.meta.env.VITE_URI_USER_PROFILE;
    return response;
  }

  async updateProfile(id, formData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_URI_USER_PROFILE_BY_ID
        }${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${this.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }

      const updatedData = await response.json();

      return updatedData;
    } catch (error) {
      console.error("Error en updateProfile:", error);
      throw error;
    }
  }
}

export default UserProfileService;
