import {
  IsUUID,
  IsDecimal,
  IsString,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Booking ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({
    example: 299.99,
    description: 'Payment amount (decimal)',
    type: 'number',
    format: 'decimal'
  })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'credit_card',
    description: 'Payment type (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  paymentType: string;

  @ApiProperty({
    example: 'pending',
    description: 'Payment status (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  status: string;

  @ApiPropertyOptional({
    example: 'txn_1234567890',
    description: 'Transaction ID (optional)'
  })
  @IsString()
  transactionId?: string;
}
