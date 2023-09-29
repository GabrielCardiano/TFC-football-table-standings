import * as Jwt from 'jsonwebtoken';

class JWT {
  public static secret: string;

  constructor() {
    // if (!process.env.JWT_SECRET) throw new Error('JWT secret is missing');
    JWT.secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public static sign(payload: { id: number, role: string }) {
    const token = Jwt.sign(payload, JWT.secret);
    return token;
  }
}

export default JWT;
