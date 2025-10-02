import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user (2-100 characters)',
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

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number (7-15 characters)',
    minLength: 7,
    maxLength: 15
  })
  @IsString()
  @Length(7, 15)
  phone: string;
}
