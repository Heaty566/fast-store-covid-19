import { Injectable } from '@nestjs/common';
import User from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
      constructor(private readonly jwtService: JwtService) {}

      async createAuthToken(user: User) {
            const encryptUser = this.encryptToken(user);
            if (!encryptUser) return null;

            return encryptUser;
      }

      async getUserByAuthToken(token: string) {
            return await this.verifyToken<User>(token);
      }

      encryptToken(tokenData: Record<any, any>) {
            try {
                  return this.jwtService.sign(JSON.stringify(tokenData));
            } catch (err) {
                  return null;
            }
      }

      verifyToken<T>(tokenData: string) {
            try {
                  return this.jwtService.verify<any>(tokenData) as T;
            } catch (err) {
                  return null;
            }
      }

      async encryptString(data: string): Promise<string> {
            return await bcrypt.hash(data, 5);
      }

      async decryptString(data: string, encryptedPassword: string): Promise<boolean> {
            return bcrypt.compare(data, encryptedPassword);
      }
}
