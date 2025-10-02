import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UnifiedLoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address for login (can be user or admin)',
    format: 'email'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for login',
    minLength: 3
  })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
