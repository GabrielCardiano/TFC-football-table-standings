import { SignOptions, JwtPayload, sign, verify, Secret } from 'jsonwebtoken';

class JWT {
  private static secret: Secret;
  private static jwtConfig: SignOptions;

  constructor() {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret is missing');
    JWT.secret = process.env.JWT_SECRET || 'jwt_secret';
    JWT.jwtConfig = { algorithm: 'HS256', expiresIn: '10d' };
  }

  public static sign(payload: JwtPayload): string {
    const token = sign(payload, this.secret, this.jwtConfig);
    return token;
  }

  public static verify(token: string): JwtPayload | boolean {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return false;
    }
  }
}

export default JWT;
