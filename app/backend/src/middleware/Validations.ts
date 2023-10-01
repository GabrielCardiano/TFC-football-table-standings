import { Response, RequestHandler } from 'express';
import JWT from '../utils/generateJWT';

class Validations {
  //  Authentication --> check user infromations (email/password)
  static validateEmail(email: string): boolean {
    const regexValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regexValidation.test(email);
  }

  static autheticateUser: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.validateEmail(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static validateToken: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    const validToken = JWT.verify(token);
    if (!validToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    res.locals.user = validToken;

    next();
  };
}

export default Validations;
