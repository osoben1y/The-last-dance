import {
  IsUUID,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Booking ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsOptional()
  bookingId?: string;

  @ApiPropertyOptional({
    example: 299.99,
    description: 'Payment amount (decimal, max 2 decimal places)',
    type: 'number',
    format: 'decimal'
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({
    example: 'credit_card',
    description: 'Payment type (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @Length(2, 20)
  @IsOptional()
  paymentType?: string;

  @ApiPropertyOptional({
    example: 'completed',
    description: 'Payment status (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @Length(2, 20)
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: 'txn_1234567890',
    description: 'Transaction ID'
  })
  @IsString()
  @IsOptional()
  transactionId?: string;
}
