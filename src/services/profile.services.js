import BaseService from "./base.services";

class UserProfileService extends BaseService{
  constructor(token) {
    super(token, import.meta.env.VITE_URI_USER_PROFILE);
  }

  async getProfile() {
    return this.getAll();
  }

  async getProfileById(id){
    this.endpoint = import.meta.env.VITE_URI_USER_PROFILE_BY_ID;
    const response = await this.getOne(id);
    this.endpoint = import.meta.env.VITE_URI_USER_PROFILE;
    return response;
  }
}

export default UserProfileService;