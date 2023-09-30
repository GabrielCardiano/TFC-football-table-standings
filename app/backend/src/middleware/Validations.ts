import { Response, RequestHandler } from 'express';

// const regexValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
// regexValidation.test()

class Validations {
  //  Authentication --> check user infromations (email/password)
  static validateEmail(email: string): boolean {
    const regexValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regexValidation.test(email);
  }

  static autheticateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.validateEmail(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  };
}

export default Validations;
