import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken, IUserModel } from '../Interfaces/IUser';
import JWT from '../utils/generateJWT';

class UserService extends JWT {
  private _userModel: IUserModel;

  constructor() {
    super();
    this._userModel = new UserModel();
  }

  public async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
    //  Authentication --> check user email
    const user = await this._userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    // Authetication --> check password with  bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    // Authorization --> generate token for authorized users
    const payload = { id: user.id, role: user.role };
    const token = JWT.sign(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
export default UserService;
