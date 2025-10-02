import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

/**
 * Update review DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateReviewDto
 */
export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
