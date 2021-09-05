import { Injectable } from '@nestjs/common';

//---- Repository
import User from './entity/user.entity';
import { UserRepository } from './user.repository';

//---- Entity

//---- DTO

//---- Common

@Injectable()
export class UserService {
      constructor(private userRepository: UserRepository) {}

      async findOneUserByField(field: keyof User, value: any) {
            return await this.userRepository.findOneByField(field, value);
      }
      async findManyUserByArrayField(field: keyof User, value: any[]) {
            return await this.userRepository.findManyByArrayValue(field, value);
      }

      async saveUser(input: User): Promise<User> {
            return await this.userRepository.save(input);
      }
}
