import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Admin } from '../admin/entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { resSuccess } from '../utils/succes-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('User not found');
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');
    const payload = { sub: user.id, email: user.email, isAdmin: false, role: 'user' };
    const token = this.jwtService.sign(payload);
    return resSuccess({ message: 'Login successful', token });
  }
  // Duplicate constructor removed
  async adminLogin(loginDto: LoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!admin) throw new UnauthorizedException('Admin not found');
    const isMatch = await bcrypt.compare(loginDto.password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');
    const role = admin.email === process.env.SUPER_ADMIN_EMAIL ? 'super-admin' : 'admin';
    const payload = { sub: admin.id, email: admin.email, isAdmin: true, role };
    const token = this.jwtService.sign(payload);
    return resSuccess({ message: 'Admin login successful', token });
  }


  async register(registerDto: RegisterDto) {
    const { email, password, name, phone } = registerDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashed, name, phone });
    await this.userRepository.save(user);
    return resSuccess({ message: 'User registered successfully' });
  }
}
