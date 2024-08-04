import BaseService from "./base.services";

class UserProfileService extends BaseService{
  constructor(token) {
    super(token, import.meta.env.VITE_URI_USER_PROFILE);
  }

  async getProfile() {
    return this.getAll();
  }
}

export default UserProfileService;