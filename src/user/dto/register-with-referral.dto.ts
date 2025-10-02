import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class RegisterWithReferralDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsString()
  @Length(7, 15)
  phone: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}
