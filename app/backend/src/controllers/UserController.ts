import { Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import UserService from '../services/UserService';

class UserController {
  constructor(
    private _userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this._userService.login(email, password);
    return res.status(httpResponse(status)).json(data);
  }

  public static getUserRole(req: Request, res: Response) {
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}

export default UserController;
