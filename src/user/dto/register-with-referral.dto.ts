import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterWithReferralDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name (2-100 characters)',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
    format: 'email'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (minimum 3 characters)',
    minLength: 3
  })
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiPropertyOptional({
    example: 'REF123',
    description: 'Referral code (optional)'
  })
  @IsOptional()
  @IsString()
  referralCode?: string;
}
