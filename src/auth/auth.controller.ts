import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UnifiedLoginDto } from './dto/unified-login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Unified login for users and admins' })
  @ApiBody({
    type: UnifiedLoginDto,
    examples: {
      user: {
        summary: 'User login example',
        value: {
          email: 'user@example.com',
          password: 'password123'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Login successful',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: UnifiedLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      user: {
        summary: 'User registration example',
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          message: 'User registered successfully. Please check your email for verification code.',
          userId: 'uuid-string'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for email verification' })
  @ApiBody({
    type: VerifyOtpDto,
    examples: {
      verification: {
        summary: 'OTP verification example',
        value: {
          email: 'john@example.com',
          otp: '123456'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Email verified successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
