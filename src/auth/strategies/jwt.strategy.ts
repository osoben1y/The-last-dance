import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    const { sub, email, isAdmin, role } = payload;
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const isAdminFlag = Boolean(isAdmin) || role === 'admin' || role === 'super-admin' || (superAdminEmail && email === superAdminEmail);
    return { sub, email, isAdmin: isAdminFlag, role };
  }
}
