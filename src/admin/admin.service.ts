import {
  Injectable,
  BadRequestException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { handleError } from '../utils/hande-error';
import { resSuccess } from '../utils/succes-response';
import { validateUUID } from '../utils/validate-uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  async findByEmail(email: string): Promise<Admin | null> {
    if (!email) return null;
    return await this.adminRepository.findOne({ where: { email } });
  }
  async onModuleInit() {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    if (!email || !password) return;
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = this.adminRepository.create({
        name: 'Super Admin',
        email,
        password: hashedPassword,
      });
      await this.adminRepository.save(admin);
      return;
    }

    const passwordLooksHashed = existingAdmin.password?.startsWith('$2');
    let passwordMatches = false;
    if (passwordLooksHashed) {
      try {
        passwordMatches = await bcrypt.compare(password, existingAdmin.password);
      } catch (error) {
        passwordMatches = false;
      }
    }

    if (!passwordLooksHashed || !passwordMatches) {
      existingAdmin.password = await bcrypt.hash(password, 10);
      if (!existingAdmin.name) {
        existingAdmin.name = 'Super Admin';
      }
      await this.adminRepository.save(existingAdmin);
    }
  }
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<object> {
    try {
      // Email unique validation
      const existing = await this.adminRepository.findOne({
        where: { email: createAdminDto.email },
      });
      if (existing)
        throw new BadRequestException('Admin with this email already exists');
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      const admin = this.adminRepository.create({
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: hashedPassword,
      });
      const savedAdmin = await this.adminRepository.save(admin);
      return resSuccess({
        message: 'Admin created successfully',
        data: savedAdmin,
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async findAll(): Promise<object> {
    try {
      const admins = await this.adminRepository.find();
      return resSuccess({ data: admins });
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Admin ID');
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) throw new NotFoundException('Admin not found');
      return resSuccess({ data: admin });
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<object> {
    try {
      validateUUID(id, 'Admin ID');
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) throw new NotFoundException('Admin not found');
      const { password: newPassword, ...rest } = updateAdminDto as UpdateAdminDto & { password?: string };
      if (newPassword) {
        admin.password = await bcrypt.hash(newPassword, 10);
      }
      Object.assign(admin, rest);
      await this.adminRepository.save(admin);
      const updatedAdmin = await this.adminRepository.findOne({
        where: { id },
      });
      if (!updatedAdmin)
        throw new NotFoundException('Admin not found after update');
      return resSuccess({
        message: 'Admin updated successfully',
        data: updatedAdmin,
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Admin ID');
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) throw new NotFoundException('Admin not found');
      await this.adminRepository.delete(id);
      return resSuccess({ message: 'Admin deleted successfully' });
    } catch (error) {
      handleError(error);
      return { message: 'Error deleting admin' };
    }
  }

  async findByUserId(userId: string): Promise<Admin | null> {
    // userId orqali adminni topish
    if (!userId) return null;
  return null; // or handle as needed
  }
}











