import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, password: string) {
    /**
     * ───────────── CURRENT (Challenge quick start) ─────────────
     * Hardcoded default user so auth works before DB is wired.
     * This is TEMPORARY and only for bootstrapping the project.
     */
    const defaultUser = {
      id: 1,
      email: 'admin@seed28.com',
      // hash for "seed28"
      passwordHash:
        '$2b$10$wH8Q8QFQ6V5yWwV9gq9k2eZ7m7lQv6vFQ8Zp3nGZk8uC0u6mV8YyK',
    };

    if (email !== defaultUser.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordOk = await bcrypt.compare(password, defaultUser.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: defaultUser.id, email: defaultUser.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    /**
     * ───────────── FUTURE (Real implementation) ─────────────
     * Replace the block above with DB validation.
     * Requires UsersService + User entity connected to PostgreSQL.
     */

    // const user = await this.usersService.findByEmail(email);
    // if (!user) throw new UnauthorizedException('Invalid credentials');

    // const passwordOk = await bcrypt.compare(password, user.passwordHash);
    // if (!passwordOk) throw new UnauthorizedException('Invalid credentials');

    // const payload = { sub: user.id, email: user.email };
    // return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signup(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // UsersService owns hashing + persistence
    const user = await this.usersService.createUser({ email, password });

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
