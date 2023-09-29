import { Response, RequestHandler } from 'express';

class Validations {
  //  Authentication --> check user infromations (email/password)
  static autheticateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };
}

export default Validations;
