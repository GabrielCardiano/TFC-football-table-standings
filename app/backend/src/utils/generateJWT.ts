import * as Jwt from 'jsonwebtoken';

class JWT {
  public static secret: string;
  // private static jwtConfig: Jwt.SignOptions;

  constructor() {
    // if (!process.env.JWT_SECRET) throw new Error('JWT secret is missing');
    JWT.secret = process.env.JWT_SECRET || 'jwt_secret';
    // JWT.jwtConfig = { algorithm: 'HS256', expiresIn: '10d' };
  }

  public static sign(payload: Jwt.JwtPayload): string {
    const token = Jwt.sign(payload, JWT.secret);
    return token;
  }

  // public static verify(token: string): Jwt.JwtPayload | string {
  //   try {
  //     return Jwt.verify(token, JWT.secret) as Jwt.JwtPayload;
  //   } catch (error) {
  //     return 'Token invalid';
  //   }
  // }
}

export default JWT;
