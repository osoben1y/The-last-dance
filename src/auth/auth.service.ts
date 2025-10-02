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
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { resSuccess } from '../utils/succes-response';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  private otpStorage: Map<string, { otp: string; expiresAt: Date }> = new Map();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async login(loginDto: LoginDto) {
    const admin = await this.adminRepository.findOne({ where: { email: loginDto.email } });
    if (admin) {
      const isMatch = await bcrypt.compare(loginDto.password, admin.password);
      if (!isMatch) throw new UnauthorizedException('Invalid password');
      const role = admin.email === process.env.SUPER_ADMIN_EMAIL ? 'super-admin' : 'admin';
      const payload = { sub: admin.id, email: admin.email, isAdmin: true, role };
      const token = this.jwtService.sign(payload);
      return resSuccess({ message: 'Admin login successful', token });
    }

    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.isVerified) throw new UnauthorizedException('Please verify your email first');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, email: user.email, isAdmin: false, role: 'user' };
    const token = this.jwtService.sign(payload);
    return resSuccess({ message: 'Login successful', token });
  }

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
    const { email, password, name } = registerDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashed,
      name,
      isVerified: false
    });

    const savedUser = await this.userRepository.save(user);

    const otp = this.otpService.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    this.otpStorage.set(email, { otp, expiresAt });

    try {
      await this.otpService.sendOtpEmail(email, otp, name);
    } catch (error) {
      console.error('Failed to send OTP email:', error);
    }

    return resSuccess({
      message: 'User registered successfully. Please check your email for verification code.',
      userId: savedUser.id
    });
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    const storedOtpData = this.otpStorage.get(email);

    if (!storedOtpData) {
      throw new BadRequestException('No OTP found for this email. Please register first.');
    }

    if (new Date() > storedOtpData.expiresAt) {
      this.otpStorage.delete(email);
      throw new BadRequestException('OTP has expired. Please register again.');
    }

    if (storedOtpData.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.userRepository.update({ email }, { isVerified: true });
    this.otpStorage.delete(email);

    return resSuccess({ message: 'Email verified successfully' });
  }
}
