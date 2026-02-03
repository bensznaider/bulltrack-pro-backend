import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const email = dto.email.toLowerCase().trim();

    const exists = await this.findByEmail(email);
    if (exists) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      email,
      passwordHash,
    });

    return user;
  }
}
