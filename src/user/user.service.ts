import { RegisterWithReferralDto } from './dto/register-with-referral.dto';
import { LoyaltyService } from '../loyalty/loyalty.service';
import { LoyaltyLevel } from '../loyalty/entities/loyalty.entity';

import {
  Injectable,
  OnModuleInit,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { validateUUID } from '../utils/validate-uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { handleError } from '../utils/hande-error';
import { resSuccess } from '../utils/succes-response';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly loyaltyService: LoyaltyService,
  ) {}
  async registerWithReferral(dto: RegisterWithReferralDto): Promise<object> {
    try {
      const existing = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existing) throw new BadRequestException('Email already exists');
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = this.userRepository.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone,
      });
      const savedUser = await this.userRepository.save(user);

      // Referral code orqali taklif qilgan userni topish
      let referralBonus = 0;
      if (dto.referralCode) {
        const referrer = await this.userRepository.findOne({
          where: { id: dto.referralCode },
        });
        if (referrer) {
          referralBonus = 50; // bonus bal miqdori
          // Taklif qilgan userga bonus
          await this.loyaltyService.update(referrer.id, {
            points: referralBonus,
          });
        }
      }
      // Yangi userga bonus
      await this.loyaltyService.create({
        userId: savedUser.id,
        points: referralBonus,
        level: LoyaltyLevel.BRONZE,
      });

      return resSuccess({
        message: 'Registration with referral successful',
        data: savedUser,
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Super adminni avtomatik yaratish
  async onModuleInit() {
    // SUPER-ADMIN creation logic will be moved to admin module
  }

  async create(createUserDto: CreateUserDto): Promise<object> {
    try {
      const existing = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existing) throw new BadRequestException('Email already exists');

      const user = this.userRepository.create({
        ...createUserDto,
      });
      const savedUser = await this.userRepository.save(user);
      return resSuccess({
        message: 'User created successfully',
        data: savedUser,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const users = await this.userRepository.find();
      return resSuccess({ data: users });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User list error', data: [] });
    }
  }

  // Oddiy user uchun faqat o'zini ko'rsatish
  async findSelf(userId: string): Promise<object> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      return resSuccess({ data: user });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User not found', data: null });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      validateUUID(id, 'User ID');
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      return resSuccess({ data: user });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User not found', data: null });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<object>  {
    try {
      validateUUID(id, 'User ID');
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      // Email unique validation

      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOne({ where: { id } });
      return resSuccess({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'User ID');
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      await this.userRepository.delete(id);
      return resSuccess({ message: 'User deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'User delete error' });
    }
  }
}

