import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
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
    description: 'User password (3-20 characters)',
    minLength: 3,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number (7-15 characters)',
    minLength: 7,
    maxLength: 15
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @IsPhoneNumber()
  phone: string;
}
