import {
  IsUUID,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto {
  @IsUUID()
  @IsOptional()
  bookingId?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  amount?: number;

  @IsString()
  @Length(2, 20)
  @IsOptional()
  paymentType?: string;

  @IsString()
  @Length(2, 20)
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;
}
