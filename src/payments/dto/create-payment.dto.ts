import {
  IsUUID,
  IsDecimal,
  IsString,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  paymentType: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  status: string;

  @IsString()
  transactionId?: string;
}
