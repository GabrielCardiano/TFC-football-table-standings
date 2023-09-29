import { IUser, IUserModel } from '../Interfaces/IUser';
import userModel from '../database/models/UserModel';

class UserModel implements IUserModel {
  private model = userModel;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user.toJSON();
  }
}

export default UserModel;
